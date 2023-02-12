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
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

import static cp.smile.config.response.CustomSuccessStatus.*;

@Slf4j
@Tag(name = "스터디정보 관리 API", description = "스터디 정보 관리 API 모음")
@RestController
@RequiredArgsConstructor
public class StudyAdminController {

    private final StudyAdminService studyAdminService;
    private final ResponseService responseService;

    @Tag(name="스터디정보 관리 API")
    /* 스터디에 속한 회원조회 */
    @Operation(summary = "스터디 속한 회원 조회", description =  "주어진 스터디에 속하는 회원 정보를 반환함.")
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
    @Tag(name="스터디정보 관리 API")
    @Operation(summary = "스터디장 위임", description =  "스터디장 권한을 다른 유저에게 위임함")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API 정상 동작"),
            @ApiResponse(responseCode = "400",description = "API 에러")
    })
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
    @Tag(name="스터디정보 관리 API")
    @Operation(summary = "스터디 종료", description =  "스터디 테이블에 종료상태값을 바꿔서 종료된 스터디로 표시")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API 정상 동작"),
            @ApiResponse(responseCode = "400",description = "API 에러")
    })
    @PatchMapping("studies/{studyId}/close")
    public CommonResponse closeStudy(
            @PathVariable int studyId,
            @AuthenticationPrincipal CustomOAuth2User oAuth2User) {

        int studyLeaderId = oAuth2User.getUserId();

        studyAdminService.closeStudy(studyLeaderId, studyId);

        return responseService.getSuccessResponse();
    }

    /* 스터디 모집 */
    @Tag(name="스터디정보 관리 API")
    @Operation(summary = "스터디 모집", description =  "스터디 테이블에 데드라인컬럼을 바꿔서 모집 가능하도록 함, 스터디 조회시 보여짐")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API 정상 동작"),
            @ApiResponse(responseCode = "400",description = "API 에러")
    })
    @PatchMapping("studies/{studyId}/recruit")
    public CommonResponse recruitStudy(
            @PathVariable int studyId,
            @AuthenticationPrincipal CustomOAuth2User oAuth2User) {

        int studyLeaderId = oAuth2User.getUserId();

        studyAdminService.recruitStudy(studyLeaderId, studyId);

        return responseService.getSuccessResponse();
    }

    /* 스터디 마감 */
    @Tag(name="스터디정보 관리 API")
    @Operation(summary = "스터디 마감", description =  "스터디 테이블의 데드라인 컬럼을 마감상태로 바꿔, 스터디 조회시 안보이게 함.")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API 정상 동작"),
            @ApiResponse(responseCode = "400",description = "API 에러")
    })
    @PatchMapping("studies/{studyId}/deadline")
    public CommonResponse deadlineStudy(
            @PathVariable int studyId,
            @AuthenticationPrincipal CustomOAuth2User oAuth2User) {

        int studyLeaderId = oAuth2User.getUserId();

        studyAdminService.deadlineStudy(studyLeaderId, studyId);

        return responseService.getSuccessResponse();
    }

    /* 스터디 강퇴 */
    @Tag(name="스터디정보 관리 API")
    @Operation(summary = "스터디 강퇴 ", description =  "스터디 유저 가입 정보 테이블에 강퇴 체크 변수를 true 바꿔서 스터디 조회 안되도록 함.")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API 정상 동작"),
            @ApiResponse(responseCode = "400",description = "API 에러")
    })
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
    @Tag(name="스터디정보 관리 API")
    @Operation(summary = "스터디 정보 수정 ", description =  "스터디 관리에 필요한 내용들을 수정할 수 있도록 함.")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API 정상 동작"),
            @ApiResponse(responseCode = "400",description = "API 에러")
    })
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
