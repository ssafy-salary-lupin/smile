package cp.smile.study_management.schedule.service;

import cp.smile.study_management.schedule.dto.request.CreateScheduleDTO;
import cp.smile.study_management.schedule.dto.request.UpdateScheduleDTO;
import cp.smile.study_management.schedule.dto.response.ScheduleDTO;

import java.util.List;

public interface StudyScheduleService {


    //일정 전체 조회
    List<ScheduleDTO> findAllSchedule(int userId,int studyId);

    //일정 단건 조회
    ScheduleDTO findDetailSchedule(int userId,int studyId,int scheduleId);

    //일정 생성
    void createStudySchedule(int userId,CreateScheduleDTO createScheduleDTO);

    void updateStudySchedule(int userId, int studyId, int scheduleId, UpdateScheduleDTO updateScheduleDTO);
}
