package cp.smile.study_management.schedule.controller;

import cp.smile.auth.oauth2.CustomOAuth2User;
import cp.smile.config.response.CommonResponse;
import cp.smile.config.response.DataResponse;
import cp.smile.config.response.ResponseService;
import cp.smile.study_management.schedule.dto.request.CreateScheduleDTO;
import cp.smile.study_management.schedule.dto.request.UpdateScheduleDTO;
import cp.smile.study_management.schedule.dto.response.ScheduleDTO;
import cp.smile.study_management.schedule.dto.response.ScheduleTypeDTO;
import cp.smile.study_management.schedule.service.StudyScheduleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static cp.smile.config.response.CustomSuccessStatus.RESPONSE_NO_CONTENT;
import static cp.smile.config.response.CustomSuccessStatus.RESPONSE_SUCCESS;

@Slf4j
@RestController
@RequiredArgsConstructor
public class StudyScheduleController {

    private final StudyScheduleService studyScheduleService;
    private final ResponseService responseService;

    @Operation(summary = "스터디 일정생성", description =  "스터디 일정정보를 입력받아 일정을 생성함. - 반환값 없음.")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API 정상 동작"),
            @ApiResponse(responseCode = "400",description = "API 에러")
    })
    @PostMapping("/studies/{studyId}/schedules")
    public CommonResponse createSchedules(
            @PathVariable int studyId,
            @AuthenticationPrincipal CustomOAuth2User oAuth2User,
            @RequestBody CreateScheduleDTO createScheduleDTO){

        int userId = oAuth2User.getUserId();

        createScheduleDTO.setStudyId(studyId);

        studyScheduleService.createStudySchedule(userId, createScheduleDTO);

        return responseService.getSuccessResponse();
    }

    @Operation(summary = "모든 스터디 일정 조회", description =  "등록된 모든 스터디 정보 조회 - 이름, 식별자, 색깔만 반환.")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API 정상 동작"),
            @ApiResponse(responseCode = "400",description = "API 에러")
    })
    @GetMapping("/studies/{studyId}/schedules")
    public DataResponse<List<ScheduleDTO>> findAllSchedules(
            @PathVariable int studyId,
            @AuthenticationPrincipal CustomOAuth2User oAuth2User){

        int userId = oAuth2User.getUserId();

        List<ScheduleDTO> scheduleDTOS = studyScheduleService.findAllSchedule(userId, studyId);
        if(scheduleDTOS.isEmpty()) return responseService.getDataResponse(scheduleDTOS, RESPONSE_NO_CONTENT);

        return responseService.getDataResponse(scheduleDTOS, RESPONSE_SUCCESS);
    }

    @Operation(summary = "특정 스터디 일정 조회", description =  "스터디 일정 식별자를 입력 받아, 해당 스터디의 상세 내용을 반환함.")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API 정상 동작"),
            @ApiResponse(responseCode = "400",description = "API 에러")
    })
    @GetMapping("/studies/{studyId}/schedules/{scheduleId}")
    public DataResponse<ScheduleDTO> findOneSchedules(
            @PathVariable int studyId,
            @PathVariable int scheduleId,
            @AuthenticationPrincipal CustomOAuth2User oAuth2User){

        int userId = oAuth2User.getUserId();

        ScheduleDTO scheduleDTO = studyScheduleService.findDetailSchedule(userId, studyId, scheduleId);

        return responseService.getDataResponse(scheduleDTO, RESPONSE_SUCCESS);
    }

    /* 스터디 일정 수정 */
    @Operation(summary = "스터디 일정 정보 수정", description =  "스터디 일정 수정 정보를 입력받아서 정보를 수정함")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API 정상 동작"),
            @ApiResponse(responseCode = "400",description = "API 에러")
    })
    @PatchMapping("/studies/{studyId}/schedules/{scheduleId}")
    public CommonResponse updateStudySchedule(
            @PathVariable int studyId,
            @PathVariable int scheduleId,
            @RequestBody UpdateScheduleDTO updateScheduleDTO,
            @AuthenticationPrincipal CustomOAuth2User oAuth2User) {

        int userId = oAuth2User.getUserId();

        System.out.println(updateScheduleDTO);

        studyScheduleService.updateStudySchedule(userId, studyId, scheduleId, updateScheduleDTO);

        return responseService.getSuccessResponse();
    }

    /* 스터디 일정 삭제 */
    @Operation(summary = "스터디 일정 삭제", description =  "스터디 일정을 삭제함 - 삭제되었다는 표시를 함.")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API 정상 동작"),
            @ApiResponse(responseCode = "400",description = "API 에러")
    })
    @DeleteMapping("/studies/{studyId}/schedules/{scheduleId}")
    public CommonResponse deleteStudySchedule(
            @PathVariable int studyId,
            @PathVariable int scheduleId,
            @AuthenticationPrincipal CustomOAuth2User oAuth2User) {

        int userId = oAuth2User.getUserId();

        studyScheduleService.deleteStudySchedule(userId, studyId, scheduleId);

        return responseService.getSuccessResponse();
    }

    @Operation(summary = "스터디 일정 유형 조회", description =  "스터디 일정 유형을 전부 조회 - 일정 유형 이름, 식별자 조회.")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API 정상 동작"),
            @ApiResponse(responseCode = "400",description = "API 에러")
    })
    @GetMapping("/studies/schedules/types")
    public DataResponse<Map<String, Object>> getTypes() {
        List<ScheduleTypeDTO> types = studyScheduleService.findAllType();

        Map<String, Object> data = new HashMap<>();
        data.put("types", types);

        return responseService.getDataResponse(data, types.isEmpty() ? RESPONSE_NO_CONTENT : RESPONSE_SUCCESS);
    }
}
