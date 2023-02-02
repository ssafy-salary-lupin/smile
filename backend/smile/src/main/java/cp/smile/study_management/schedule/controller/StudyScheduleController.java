package cp.smile.study_management.schedule.controller;

import cp.smile.auth.oauth2.CustomOAuth2User;
import cp.smile.config.response.CommonResponse;
import cp.smile.config.response.DataResponse;
import cp.smile.config.response.ResponseService;
import cp.smile.study_management.schedule.dto.request.CreateScheduleDTO;
import cp.smile.study_management.schedule.dto.response.ScheduleDTO;
import cp.smile.study_management.schedule.service.StudyScheduleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

        return responseService.getDataResponse(scheduleDTOS);
    }

    @GetMapping("/studies/{studyId}/schedules/{scheduleId}")
    public DataResponse<ScheduleDTO> findOneSchedules(
            @PathVariable int studyId,
            @PathVariable int scheduleId,
            @AuthenticationPrincipal CustomOAuth2User oAuth2User){

        int userId = oAuth2User.getUserId();

        ScheduleDTO scheduleDTO = studyScheduleService.findDetailSchedule(userId, studyId, scheduleId);

        return responseService.getDataResponse(scheduleDTO);
    }

}
