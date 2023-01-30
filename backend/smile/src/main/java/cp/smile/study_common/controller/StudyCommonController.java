package cp.smile.study_common.controller;


import cp.smile.config.response.DataResponse;
import cp.smile.config.response.ResponseService;
import cp.smile.study_common.dto.response.FindAllStudyDTO;
import cp.smile.study_common.service.StudyCommonService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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




}
