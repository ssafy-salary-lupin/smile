package cp.smile.study_management.home.controller;

import cp.smile.auth.oauth2.CustomOAuth2User;
import cp.smile.config.response.DataResponse;
import cp.smile.config.response.ResponseService;
import cp.smile.study_management.home.dto.response.StudyHomeDetailDTO;
import cp.smile.study_management.home.service.HomeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import cp.smile.study_management.home.dto.response.ScheduleDdayDTO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import static cp.smile.config.response.CustomSuccessStatus.RESPONSE_SUCCESS;
import java.util.List;

import static cp.smile.config.response.CustomSuccessStatus.*;

@Slf4j
@RestController
@RequiredArgsConstructor
public class HomeController {

    private final HomeService homeService;
    private final ResponseService responseService;

    /* 관리 홈 상세 조회 */
    @Operation(summary = "스터디 관리 홈 조회 ", description =  "스터디 관리 홈에서 보여지는 규칙, 스터디 정보를 반환해줌")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API 정상 동작"),
            @ApiResponse(responseCode = "400",description = "API 에러")
    })
    @GetMapping("/studies/{studyId}/home")
    public DataResponse<StudyHomeDetailDTO> findStudyHomeDetail(
            @PathVariable int studyId,
            @AuthenticationPrincipal CustomOAuth2User oAuth2User) {

        int userId = oAuth2User.getUserId();

        return responseService.getDataResponse(homeService.findStudyHomeDetail(userId, studyId), RESPONSE_SUCCESS);
    }

    /*디데이 조회*/
    @Operation(summary = "스터디 일정 디데이 조회 ", description =  "스터디 일정중 남은 시간 순서대로 5개를 뽑아서 반환해줌.")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API 정상 동작"),
            @ApiResponse(responseCode = "400",description = "API 에러")
    })
    @GetMapping("/studies/{studyId}/home/d-day")
    public DataResponse<List<ScheduleDdayDTO>> findDday(
            @PathVariable int studyId,
            @AuthenticationPrincipal CustomOAuth2User oAuth2User
    ){

        int userId = oAuth2User.getUserId();
        List<ScheduleDdayDTO> scheduleDdayDTOS = homeService.findDday(userId, studyId);

        if(scheduleDdayDTOS.isEmpty()) return responseService.getDataResponse(scheduleDdayDTOS,RESPONSE_NO_CONTENT);

        return responseService.getDataResponse(scheduleDdayDTOS,RESPONSE_SUCCESS);

    }

}
