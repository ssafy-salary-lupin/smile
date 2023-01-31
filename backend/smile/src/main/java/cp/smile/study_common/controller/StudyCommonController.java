package cp.smile.study_common.controller;


import cp.smile.config.response.CommonResponse;
import cp.smile.config.response.DataResponse;
import cp.smile.config.response.ResponseService;
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

        //서비스 계층 호출 하는 로직 필요
        return responseService.getSuccessResponse();
    }

    // TODO : PathVariable이 없는 엔드포인트와 합치는 것 고려.
    @GetMapping("/studies/{studyId}")
    public DataResponse<FindDetailStudyDTO> findDetailStudy(@PathVariable int studyId){

        return responseService.getDataResponse(studyCommonService.findDetailStudy(studyId));
    }






}
