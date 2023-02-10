package cp.smile.study_management.home.service;


import cp.smile.config.response.exception.CustomException;
import cp.smile.config.response.exception.CustomExceptionStatus;
import cp.smile.entity.study_management.StudySchedule;
import cp.smile.study_common.repository.StudyCommonRepository;
import cp.smile.study_management.home.dto.response.ScheduleDdayDTO;
import cp.smile.study_management.schedule.repository.StudyScheduleRepository;
import cp.smile.user.repository.UserJoinStudyRepository;
import cp.smile.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


@Slf4j
@RequiredArgsConstructor
@Service
public class HomeServiceImpl implements HomeService {


    //유저 레포
    private final UserRepository userRepository;

    //스터디 레포지토리.
    private final StudyCommonRepository studyCommonRepository;

    //유저 스터디 가입 정보 레포지토리.
    private final UserJoinStudyRepository userJoinStudyRepository;

    //일정 레포지 토리.
    private final StudyScheduleRepository studyScheduleRepository;


    @Override
    public List<ScheduleDdayDTO> findDDay(int userId, int studyId) {

        //해당 유저가 스터디에 속한 사람인지 확인 - 스터디, 유저 조회.
        userRepository
                .findById(userId)
                .orElseThrow(() -> new CustomException(CustomExceptionStatus.ACCOUNT_NOT_FOUND));

        studyCommonRepository
                .findById(studyId)
                .orElseThrow(() -> new CustomException(CustomExceptionStatus.NOT_FOUND_STUDY));

        userJoinStudyRepository
                .findByUserIdAndStudyId(userId,studyId)
                .orElseThrow(() -> new CustomException(CustomExceptionStatus.USER_NOT_ACCESS_STUDY));

        //현재시간 조회
        LocalDateTime currentTime = LocalDateTime.now();

        //스터디의 일정 조회
        List<StudySchedule> studySchedules = studyScheduleRepository
                .findAllByEndTimeLimit5(currentTime, PageRequest.of(0,5))
                .orElseThrow(() -> new CustomException(CustomExceptionStatus.NOT_FOUND_SCHEDULE));


        //스터디일정을 d-day DTO로 변환
        List<ScheduleDdayDTO> scheduleDdayDTOS = studySchedules.stream()
                .map((studySchedule) -> studySchedule.createScheduleDdayDTO(currentTime))
                .collect(Collectors.toList());

        return scheduleDdayDTOS;
    }

}
