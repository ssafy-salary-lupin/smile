package cp.smile.study_management.admin.controller;

import cp.smile.config.response.DataResponse;
import cp.smile.config.response.ResponseService;
import cp.smile.study_management.admin.dto.response.FindStudyUserDTO;
import cp.smile.study_management.admin.service.StudyAdminService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
public class StudyAdminController {

    private final StudyAdminService studyAdminService;
    private final ResponseService responseService;

    @GetMapping("/studies/{studyId}/users")
    public DataResponse<List<FindStudyUserDTO>> findAllUser(@PathVariable int studyId) {
        return responseService.getDataResponse(studyAdminService.findAllUser(studyId));
    }
}
