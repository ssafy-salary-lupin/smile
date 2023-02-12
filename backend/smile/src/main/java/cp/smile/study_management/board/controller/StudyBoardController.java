package cp.smile.study_management.board.controller;

import cp.smile.auth.oauth2.CustomOAuth2User;
import cp.smile.config.response.CommonResponse;
import cp.smile.config.response.CustomSuccessStatus;
import cp.smile.config.response.DataResponse;
import cp.smile.config.response.ResponseService;
import cp.smile.config.response.exception.CustomException;
import cp.smile.config.response.exception.CustomExceptionStatus;
import cp.smile.dto.response.PageDTO;
import cp.smile.entity.study_management.StudyBoard;
import cp.smile.entity.study_management.StudyBoardType;
import cp.smile.entity.user.User;
import cp.smile.entity.user.UserJoinStudy;
import cp.smile.study_management.board.dto.request.StudyBoardWriteDTO;
import cp.smile.study_management.board.dto.request.UpdateCommentDTO;
import cp.smile.study_management.board.dto.response.BoardTypeDTO;
import cp.smile.study_management.board.dto.response.DetailBoardDTO;
import cp.smile.study_management.board.dto.response.SimpleBoardDTO;
import cp.smile.study_management.board.service.StudyBoardService;
import cp.smile.user.repository.UserJoinStudyRepository;
import cp.smile.user.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static cp.smile.config.response.CustomSuccessStatus.RESPONSE_NO_CONTENT;
import static cp.smile.config.response.CustomSuccessStatus.RESPONSE_SUCCESS;
import static cp.smile.config.response.exception.CustomExceptionStatus.*;
import static cp.smile.config.response.exception.CustomExceptionStatus.ACCOUNT_NOT_FOUND;
import static cp.smile.config.response.exception.CustomExceptionStatus.USER_NOT_ACCESS_STUDY;

@RestController
@RequestMapping("")
@Tag(name = "스터디 게시판 API", description = "스터디 게시판 관련 API 모음")
@Slf4j
@RequiredArgsConstructor
public class StudyBoardController {

    private final StudyBoardService studyBoardService;
    private final ResponseService responseService;
    private final UserRepository userRepository;
    private final UserJoinStudyRepository userJoinStudyRepository;

    @Tag(name="스터디 게시판 API")
    /* 스터디에 속한 회원조회 */
    @Operation(summary = "스터디 게시글 작성", description =  "가입한 스터디의 게시판에 글 작성.")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API 정상 동작"),
            @ApiResponse(responseCode = "400",description = "API 에러")
    })
    @PostMapping("/studies/{studyId}/boards")
    public CommonResponse write(@AuthenticationPrincipal CustomOAuth2User oAuth2User,
                                @PathVariable int studyId,
                                @RequestPart("data") StudyBoardWriteDTO dto,
                                @RequestPart(value = "files", required = false) MultipartFile[] files) {

        log.info("[***file - check***] : {}" , files);

        UserJoinStudy userJoinStudy = userJoinStudyRepository.findByUserIdAndStudyId(oAuth2User.getUserId(), studyId)
                .orElseThrow(() -> new CustomException(USER_NOT_ACCESS_STUDY));


        studyBoardService.write(userJoinStudy, dto, files);
        log.info("스터디 게시글 작성 - 작성자: {} / 스터디: {}",
                userJoinStudy.getUser(), userJoinStudy.getStudyInformation());

        return responseService.getSuccessResponse();
    }

    @Tag(name="스터디 게시판 API")
    /* 스터디에 속한 회원조회 */
    @Operation(summary = "스터디 게시글 전체 조회", description =  "가입한 스터디의 게시판의 모든 글 조회 - 조회 목록에 필요한 제목등의 정보만 반환.")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API 정상 동작"),
            @ApiResponse(responseCode = "400",description = "API 에러")
    })
    @GetMapping("/studies/{studyId}/boards")
    public DataResponse<PageDTO<SimpleBoardDTO>> getAllStudyBoard(
            @AuthenticationPrincipal CustomOAuth2User customOAuth2User,
            @PathVariable int studyId,
            @RequestParam(value = "page", required = false) Integer page,
            @RequestParam(value = "size", required = false) Integer size,
            @RequestParam(value = "type", required = false) Integer typeId) {
        // 가입한 스터디의 게시글만 볼 수 있도록 검사
        userJoinStudyRepository.findByUserIdAndStudyId(customOAuth2User.getUserId(), studyId)
                .orElseThrow(() -> new CustomException(USER_NOT_ACCESS_STUDY));

        //공지가 아닐때,
        if(typeId == null){
            typeId = 0;
            if (page == null) page = 1;
            if (size == null) size = 10;
            page--;

            if (page < 1 && size < 1) {
                throw new IllegalArgumentException();
            }
        }
        //공지사항 조회일때 - 5개만 호출
        else if(typeId == 1){
            page = 0;
            size = 5;
        }
        //나머지 경우는 잘못된 요청
        else throw new CustomException(REQUEST_QUERY_ERROR);

        Page<StudyBoard> result = studyBoardService.findByStudyIdWithPaging(studyId,typeId, PageRequest.of(page, size));
        List<SimpleBoardDTO> content = result.getContent().stream()
                .map(SimpleBoardDTO::of)
                .collect(Collectors.toList());

        if(content.isEmpty()) return responseService.getDataResponse(PageDTO.of(result, content), RESPONSE_NO_CONTENT);

        return responseService.getDataResponse(PageDTO.of(result, content), RESPONSE_SUCCESS);
    }

    @Tag(name="스터디 게시판 API")
    /* 스터디에 속한 회원조회 */
    @Operation(summary = "스터디 게시글 댓글 작성", description =  "가입한 스터디의 게시판의 댓글 작성")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API 정상 동작"),
            @ApiResponse(responseCode = "400",description = "API 에러")
    })
    @PostMapping("/studies/{studyId}/boards/{boardId}/comments")
    public CommonResponse writeComment(
            @AuthenticationPrincipal CustomOAuth2User oAuth2User,
            @PathVariable int boardId,
            @RequestBody Map<String, String> body) {
        User writer = userRepository.findById(oAuth2User.getUserId())
                .orElseThrow(() -> new CustomException(ACCOUNT_NOT_FOUND));

        studyBoardService.writeComment(writer, boardId, body.get("content"));

        return responseService.getSuccessResponse();
    }

    @Tag(name="스터디 게시판 API")
    /* 스터디에 속한 회원조회 */
    @Operation(summary = "스터디 게시글 상세 정보 조회", description =  "가입한 스터디의 게시판의 댓글,글내용, 파일 등 상세 정보를 반환.")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API 정상 동작"),
            @ApiResponse(responseCode = "400",description = "API 에러")
    })
    @GetMapping("/studies/{studyId}/boards/{boardId}")
    public DataResponse<DetailBoardDTO> getStudyBoardDetail(@PathVariable int boardId) {
        return responseService.getDataResponse(DetailBoardDTO.of(studyBoardService.findByIdForView(boardId)), RESPONSE_SUCCESS);
    }

    @Tag(name="스터디 게시판 API")
    /* 스터디에 속한 회원조회 */
    @Operation(summary = "스터디 게시글 유형 조회", description =  "스터디 게시글작성시 필요한 유형 전부 조회")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API 정상 동작"),
            @ApiResponse(responseCode = "400",description = "API 에러")
    })
    @GetMapping("/studies/boards/types")
    public DataResponse<Map<String, Object>> getTypes() {
        List<StudyBoardType> types = studyBoardService.findAllType();
        List<BoardTypeDTO> list = types.stream().map(BoardTypeDTO::of).collect(Collectors.toList());

        Map<String, Object> data = new HashMap<>();
        data.put("types", list);

        return responseService.getDataResponse(data, types.isEmpty() ? RESPONSE_NO_CONTENT : RESPONSE_SUCCESS);
    }

    @Tag(name="스터디 게시판 API")
    /* 스터디에 속한 회원조회 */
    @Operation(summary = "스터디 게시글 삭제", description =  "스터디 게시글 삭제처리 - 테이블에 삭제 표시만 함.")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API 정상 동작"),
            @ApiResponse(responseCode = "400",description = "API 에러")
    })
    @DeleteMapping("/studies/{studyId}/boards/{boardId}")
    public CommonResponse deleteStudyBoard(
            @PathVariable int studyId,
            @PathVariable int boardId,
            @AuthenticationPrincipal CustomOAuth2User oAuth2User
    ){

        int userId = oAuth2User.getUserId();

        studyBoardService.deleteStudyBoard(userId,studyId,boardId);

        return responseService.getSuccessResponse();

    }

    /* 스터디 게시판 댓글 수정 */
    @Tag(name="스터디 게시판 API")
    /* 스터디에 속한 회원조회 */
    @Operation(summary = "스터디 게시글 수정", description =  "스터디 게시글 수정 정보를 받아서 바뀐 부분만 수정")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API 정상 동작"),
            @ApiResponse(responseCode = "400",description = "API 에러")
    })
    @PatchMapping("/studies/{studyId}/boards/{boardId}/comments/{commentId}")
    public CommonResponse updateStudyBoardComment(
            @PathVariable int studyId,
            @PathVariable int boardId,
            @PathVariable int commentId,
            @RequestBody UpdateCommentDTO updateCommentDTO,
            @AuthenticationPrincipal CustomOAuth2User oAuth2User) {

        int userId = oAuth2User.getUserId();

        studyBoardService.updateStudyBoardComment(userId, studyId, boardId, commentId, updateCommentDTO);

        return responseService.getSuccessResponse();
    }

    /* 스터디 게시판 댓글 삭제 */
    @Tag(name="스터디 게시판 API")
    /* 스터디에 속한 회원조회 */
    @Operation(summary = "스터디 게시글 댓글 삭제", description =  "스터디 게시글의 댓글을 삭제하는 기능.")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API 정상 동작"),
            @ApiResponse(responseCode = "400",description = "API 에러")
    })
    @PatchMapping("/studies/{studyId}/boards/{boardId}/comments/{commentId}/delete")
    public CommonResponse deleteStudyBoardComment(
            @PathVariable int studyId,
            @PathVariable int boardId,
            @PathVariable int commentId,
            @AuthenticationPrincipal CustomOAuth2User oAuth2User) {

        int userId = oAuth2User.getUserId();

        studyBoardService.deleteStudyBoardComment(userId, studyId, boardId, commentId);

        return responseService.getSuccessResponse();
    }
}
