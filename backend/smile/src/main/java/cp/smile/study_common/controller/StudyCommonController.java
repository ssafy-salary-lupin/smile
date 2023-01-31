package cp.smile.study_common.controller;


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
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/studies")
    public CommonResponse createStudy(@RequestBody CreateStudyDTO createStudyDTO){

        // TODO : 유저 인증 로직 필요 - security 사용

        // TODO : 파일업로드를 위해서 MartipartFormData로 처리 필요,

        studyCommonService.createStudy(1,createStudyDTO);



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
            @PathVariable int studyId){


        // TODO : 인증을 통해서 현재 요청한 사용자의 정보를 가져오도록 해야됨
        int userId = 1;

        createCommentDTO.setUserId(userId);
        createCommentDTO.setStudyId(studyId);

        studyCommonService.createComment(createCommentDTO);

        return responseService.getSuccessResponse();

    }

    @PostMapping("/studies/{studyId}/comments/{commentId}/replies")
    public CommonResponse createStudyReply(
            @RequestBody CreateReplyDTO createReplyDTO,
            @PathVariable int studyId,
            @PathVariable int commentId){


        // TODO : 시큐리티를 이용한 인증 토큰에서 가져와야 됨.
        int userId = 1;

        createReplyDTO.setUserId(userId);
        createReplyDTO.setCommentId(commentId);


        studyCommonService.createReply(createReplyDTO);

        return responseService.getSuccessResponse();
    }

}
