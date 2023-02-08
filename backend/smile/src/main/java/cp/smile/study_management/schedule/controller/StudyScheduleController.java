package cp.smile.study_management.schedule.controller;

import cp.smile.auth.oauth2.CustomOAuth2User;
import cp.smile.config.response.CommonResponse;
import cp.smile.config.response.CustomSuccessStatus;
import cp.smile.config.response.DataResponse;
import cp.smile.config.response.ResponseService;
import cp.smile.study_management.schedule.dto.request.CreateScheduleDTO;
import cp.smile.study_management.schedule.dto.request.UpdateScheduleDTO;
import cp.smile.study_management.schedule.dto.response.ScheduleDTO;
import cp.smile.study_management.schedule.service.StudyScheduleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static cp.smile.config.response.CustomSuccessStatus.*;

@Slf4j
@RestController
@RequiredArgsConstructor
public class StudyScheduleController {

    private final StudyScheduleService studyScheduleService;
    private final ResponseService responseService;

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

    @GetMapping("/studies/{studyId}/schedules")
    public DataResponse<List<ScheduleDTO>> findAllSchedules(
            @PathVariable int studyId,
            @AuthenticationPrincipal CustomOAuth2User oAuth2User){

        int userId = oAuth2User.getUserId();

        List<ScheduleDTO> scheduleDTOS = studyScheduleService.findAllSchedule(userId, studyId);
        if(scheduleDTOS.isEmpty()) return responseService.getDataResponse(scheduleDTOS, RESPONSE_NO_CONTENT);

        return responseService.getDataResponse(scheduleDTOS, RESPONSE_SUCCESS);
    }

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
    @DeleteMapping("/studies/{studyId}/schedules/{scheduleId}")
    public CommonResponse deleteStudySchedule(
            @PathVariable int studyId,
            @PathVariable int scheduleId,
            @AuthenticationPrincipal CustomOAuth2User oAuth2User) {

        int userId = oAuth2User.getUserId();

        studyScheduleService.deleteStudySchedule(userId, studyId, scheduleId);

        return responseService.getSuccessResponse();
    }

}
