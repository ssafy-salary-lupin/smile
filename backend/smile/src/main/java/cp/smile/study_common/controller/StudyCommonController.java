package cp.smile.study_common.controller;


import cp.smile.auth.oauth2.CustomOAuth2User;
import cp.smile.config.response.CommonResponse;
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

@Slf4j
@RequiredArgsConstructor
@RestController
public class StudyCommonController {

    private final StudyCommonService studyCommonService;
    private final ResponseService responseService;


    @GetMapping("/studies")
    public DataResponse<List<FindAllStudyDTO>> findAllStudy(){

        List<FindAllStudyDTO> findAllStudyDTOS = studyCommonService.findAllStudy();

        return responseService.getDataResponse(findAllStudyDTOS);
    }

    @PostMapping(value = "/studies", consumes = {"multipart/form-data"})
    public CommonResponse createStudy(
            @RequestPart("data") CreateStudyDTO createStudyDTO,
            @RequestPart("file") MultipartFile multipartFile,
            @AuthenticationPrincipal CustomOAuth2User oAuth2User){

        int userId = oAuth2User.getUserId(); //토큰에서 유저 식별자 가져오기.

        // TODO : 파일업로드를 위해서 MartipartFormData로 처리 필요,


        studyCommonService.createStudy(userId,createStudyDTO,multipartFile);



        //서비스 계층 호출 하는 로직 필요
        return responseService.getSuccessResponse();
    }

    // TODO : PathVariable이 없는 엔드포인트와 합치는 것 고려.
    @GetMapping("/studies/{studyId}")
    public DataResponse<FindDetailStudyDTO> findDetailStudy(@PathVariable int studyId){

        return responseService.getDataResponse(studyCommonService.findDetailStudy(studyId));
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
