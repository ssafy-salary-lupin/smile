package cp.smile.study_management.admin.controller;

import cp.smile.config.response.DataResponse;
import cp.smile.config.response.ResponseService;
import cp.smile.entity.user.User;
import cp.smile.entity.user.UserJoinStudy;
import cp.smile.study_management.admin.dto.response.FindStudyJoinedUserDTO;
import cp.smile.study_management.admin.service.StudyAdminService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
public class StudyAdminController {

    private final StudyAdminService studyAdminService;
    private final ResponseService responseService;

    @GetMapping("/studies/{studyId}/users")
    public DataResponse<List<FindStudyJoinedUserDTO>> findStudyJoinedUser(@PathVariable int studyId) {

        List<User> users = studyAdminService.findUserByStudy(studyId);

        List<FindStudyJoinedUserDTO> FindStudyJoinedUserDTOS = new ArrayList<>();

        for (User user : users) {

            UserJoinStudy userJoinStudy = user.getUserJoinStudy().get(0);

            FindStudyJoinedUserDTOS.add(FindStudyJoinedUserDTO.builder()
                    .id(user.getId())
                    .email(user.getEmail())
                    .nickname(user.getNickname())
                    .isLeader(userJoinStudy.getIsLeader()).build());
        }

        return responseService.getDataResponse(FindStudyJoinedUserDTOS);
    }
}
