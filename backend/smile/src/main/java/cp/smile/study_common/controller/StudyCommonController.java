package cp.smile.study_common.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import cp.smile.auth.oauth2.CustomOAuth2User;
import cp.smile.config.response.CommonResponse;
import cp.smile.config.response.DataResponse;
import cp.smile.config.response.ResponseService;
import cp.smile.study_common.dto.FindFilter;
import cp.smile.study_common.dto.request.CreateCommentDTO;
import cp.smile.study_common.dto.request.CreateReplyDTO;
import cp.smile.study_common.dto.request.CreateStudyDTO;
import cp.smile.study_common.dto.response.FindAllStudyDTO;
import cp.smile.study_common.dto.response.FindDetailStudyDTO;
import cp.smile.study_common.dto.response.StudyTypeDTO;
import cp.smile.study_common.service.StudyCommonService;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static cp.smile.config.response.CustomSuccessStatus.RESPONSE_NO_CONTENT;
import static cp.smile.config.response.CustomSuccessStatus.RESPONSE_SUCCESS;

@Slf4j
@RequiredArgsConstructor
@RestController
public class StudyCommonController {

    private final StudyCommonService studyCommonService;
    private final ResponseService responseService;


    //쿼리 스트링으로 검색조건 넣을 수 있음.

    /**
     * 스터디 분류 id => type
     * 스터디 제목 키워드 => title
     */

    @Operation(summary = "스터디 전체 조회", description =  "생성된 모든스터디 반환, 이름(name), 카테고리 식별번호(type)으로 검색가능.")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API 정상 동작"),
            @ApiResponse(responseCode = "400",description = "API 에러")
    })
    @GetMapping("/studies")
    public DataResponse<List<FindAllStudyDTO>> findAllStudy(
            @RequestParam(required = false)Map<String,String> searchParam
            ){

        //쿼리 스트링으로 받은 파라미터를 필터 객체에 넣음.
        ObjectMapper objectMapper = new ObjectMapper();
        FindFilter findFilter = objectMapper.convertValue(searchParam,FindFilter.class);

        log.info("queryString test = {}", findFilter.toString());

        List<FindAllStudyDTO> findAllStudyDTOS = studyCommonService.findAllStudy(findFilter);

        /*조회된 데이터가 없으면 204 응답*/
        if(findAllStudyDTOS.size() == 0) return responseService.getDataResponse(findAllStudyDTOS,RESPONSE_NO_CONTENT);

        return responseService.getDataResponse(findAllStudyDTOS, RESPONSE_SUCCESS);
    }


    // TODO : 스터디 생성이 되면 스터디 아이디를 반환해주어야 함.
    // TODO : 2023.02.08 - @RequestPart의 파일 부분에 데이터가 들어오지 않는 경우를 처리했는데, 아래 로직에서는 처리가 안되었음.
    @PostMapping(value = "/studies", consumes = {"multipart/form-data"})
    public CommonResponse createStudy(
            @RequestPart("data") CreateStudyDTO createStudyDTO,
            @RequestPart(value = "file",required = false) MultipartFile multipartFile,
            @AuthenticationPrincipal CustomOAuth2User oAuth2User){

        int userId = oAuth2User.getUserId(); //토큰에서 유저 식별자 가져오기.

        studyCommonService.createStudy(userId,createStudyDTO,multipartFile);

        //서비스 계층 호출 하는 로직 필요
        return responseService.getSuccessResponse();
    }

    // TODO : PathVariable이 없는 엔드포인트와 합치는 것 고려.
    @GetMapping("/studies/{studyId}")
    public DataResponse<FindDetailStudyDTO> findDetailStudy(@PathVariable int studyId){

        return responseService.getDataResponse(studyCommonService.findDetailStudy(studyId),RESPONSE_SUCCESS);
    }


    @PostMapping("/studies/{studyId}/comments")
    public CommonResponse createStudyComment(
            @RequestBody CreateCommentDTO createCommentDTO,
            @PathVariable int studyId,
            @AuthenticationPrincipal CustomOAuth2User oAuth2User){

        int userId = oAuth2User.getUserId();// 토큰으로부터 userID 가져옴.

        createCommentDTO.setUserId(userId);
        createCommentDTO.setStudyId(studyId);

        studyCommonService.createComment(createCommentDTO);

        return responseService.getSuccessResponse();

    }

    @PostMapping("/studies/{studyId}/comments/{commentId}/replies")
    public CommonResponse createStudyReply(
            @RequestBody CreateReplyDTO createReplyDTO,
            @PathVariable int studyId,
            @PathVariable int commentId,
            @AuthenticationPrincipal CustomOAuth2User oAuth2User){

        int userId = oAuth2User.getUserId(); // 토큰으로부터 userID 가져옴.

        createReplyDTO.setUserId(userId);
        createReplyDTO.setCommentId(commentId);


        studyCommonService.createReply(createReplyDTO);

        return responseService.getSuccessResponse();
    }

    @GetMapping("/studies/types")
    public DataResponse<Map<String, Object>> getTypes() {
        List<StudyTypeDTO> types = studyCommonService.findAllType();

        Map<String, Object> data = new HashMap<>();
        data.put("types", types);

        return responseService.getDataResponse(data, types.isEmpty() ? RESPONSE_NO_CONTENT : RESPONSE_SUCCESS);
    }
}
