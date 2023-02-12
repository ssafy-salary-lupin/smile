package cp.smile.study_management.admin.controller;

import cp.smile.auth.oauth2.CustomOAuth2User;
import cp.smile.config.response.CommonResponse;
import cp.smile.config.response.CustomSuccessStatus;
import cp.smile.config.response.DataResponse;
import cp.smile.config.response.ResponseService;
import cp.smile.entity.user.User;
import cp.smile.entity.user.UserJoinStudy;
import cp.smile.study_management.admin.dto.request.StudyInfoDTO;
import cp.smile.study_management.admin.dto.response.FindStudyJoinedUserDTO;
import cp.smile.study_management.admin.service.StudyAdminService;
import cp.smile.user.repository.UserJoinStudyRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

import static cp.smile.config.response.CustomSuccessStatus.*;

@Slf4j
@RestController
@RequiredArgsConstructor
public class StudyAdminController {

    private final StudyAdminService studyAdminService;
    private final ResponseService responseService;

    /* 스터디에 속한 회원조회 */
    @Operation(summary = "스터디 속한 회원 조회", description =  "스터디 유형이름과, 식별번호를 조회함.")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API 정상 동작"),
            @ApiResponse(responseCode = "400",description = "API 에러")
    })
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
                    .imgPath((user.getImagePath()))
                    .isLeader(userJoinStudy.getIsLeader()).build());
        }

        if(FindStudyJoinedUserDTOS.isEmpty()) return responseService.getDataResponse(FindStudyJoinedUserDTOS, RESPONSE_NO_CONTENT);

        return responseService.getDataResponse(FindStudyJoinedUserDTOS, RESPONSE_SUCCESS);
    }

    /* 스터디장 위임 */
    @PatchMapping("studies/{studyId}/users/{userId}/delegate")
    public CommonResponse delegateStudyLeader(
            @PathVariable int studyId,
            @PathVariable int userId,
            @AuthenticationPrincipal CustomOAuth2User oAuth2User) {

        int currentLeaderId = oAuth2User.getUserId();

        studyAdminService.changeLeader(currentLeaderId, studyId, userId);

        return responseService.getSuccessResponse();
    }

    /* 스터디 종료 */
    @PatchMapping("studies/{studyId}/close")
    public CommonResponse closeStudy(
            @PathVariable int studyId,
            @AuthenticationPrincipal CustomOAuth2User oAuth2User) {

        int studyLeaderId = oAuth2User.getUserId();

        studyAdminService.closeStudy(studyLeaderId, studyId);

        return responseService.getSuccessResponse();
    }

    /* 스터디 모집 */
    @PatchMapping("studies/{studyId}/recruit")
    public CommonResponse recruitStudy(
            @PathVariable int studyId,
            @AuthenticationPrincipal CustomOAuth2User oAuth2User) {

        int studyLeaderId = oAuth2User.getUserId();

        studyAdminService.recruitStudy(studyLeaderId, studyId);

        return responseService.getSuccessResponse();
    }

    /* 스터디 마감 */
    @PatchMapping("studies/{studyId}/deadline")
    public CommonResponse deadlineStudy(
            @PathVariable int studyId,
            @AuthenticationPrincipal CustomOAuth2User oAuth2User) {

        int studyLeaderId = oAuth2User.getUserId();

        studyAdminService.deadlineStudy(studyLeaderId, studyId);

        return responseService.getSuccessResponse();
    }

    /* 스터디 강퇴 */
    @PatchMapping("studies/{studyId}/users/{userId}")
    public CommonResponse userBan(
            @PathVariable int studyId,
            @PathVariable int userId,
            @AuthenticationPrincipal CustomOAuth2User oAuth2User) {

        int studyLeaderId = oAuth2User.getUserId();

        studyAdminService.banUser(studyLeaderId, studyId, userId);

        return responseService.getSuccessResponse();
    }

    /* 스터디 정보 수정 */
    @PatchMapping("studies/{studyId}")
    public CommonResponse updateStudyInformation(
            @PathVariable int studyId,
            @RequestBody StudyInfoDTO studyInfoDTO,
            @AuthenticationPrincipal CustomOAuth2User oAuth2User) {

        int studyLeaderId = oAuth2User.getUserId();

        studyAdminService.updateStudyInfo(studyLeaderId, studyId, studyInfoDTO);

        return responseService.getSuccessResponse();
    }
}
