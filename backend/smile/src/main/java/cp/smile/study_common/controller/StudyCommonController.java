package cp.smile.study_common.controller;


import cp.smile.auth.oauth2.CustomOAuth2User;
import cp.smile.config.response.CommonResponse;
import cp.smile.config.response.CustomSuccessStatus;
import cp.smile.config.response.DataResponse;
import cp.smile.config.response.ResponseService;
import cp.smile.study_common.dto.request.CreateCommentDTO;
import cp.smile.study_common.dto.request.CreateReplyDTO;
import cp.smile.study_common.dto.request.CreateStudyDTO;
import cp.smile.study_common.dto.response.FindAllStudyDTO;
import cp.smile.study_common.dto.response.FindDetailStudyDTO;
import cp.smile.study_common.service.StudyCommonService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static cp.smile.config.response.CustomSuccessStatus.*;

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
     * @param title
     * @param type
     * @return
     */

    @GetMapping("/studies")
    public DataResponse<List<FindAllStudyDTO>> findAllStudy(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) int type

    ){

        List<FindAllStudyDTO> findAllStudyDTOS = studyCommonService.findAllStudy();

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

}
