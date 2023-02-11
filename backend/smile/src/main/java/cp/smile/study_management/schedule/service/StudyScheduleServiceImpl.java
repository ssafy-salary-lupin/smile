package cp.smile.study_management.schedule.service;

import cp.smile.config.response.exception.CustomException;
import cp.smile.config.response.exception.CustomExceptionStatus;
import cp.smile.entity.study_common.StudyInformation;
import cp.smile.entity.study_management.ScheduleType;
import cp.smile.entity.study_management.StudySchedule;
import cp.smile.entity.user.UserJoinStudy;
import cp.smile.entity.user.UserJoinStudyId;
import cp.smile.study_common.repository.StudyCommentRepository;
import cp.smile.study_common.repository.StudyCommonRepository;
import cp.smile.study_management.schedule.dto.request.CreateScheduleDTO;
import cp.smile.study_management.schedule.dto.request.UpdateScheduleDTO;
import cp.smile.study_management.schedule.dto.response.ScheduleDTO;
import cp.smile.study_management.schedule.dto.response.ScheduleTypeDTO;
import cp.smile.study_management.schedule.repository.StudyScheduleRepository;
import cp.smile.study_management.schedule.repository.StudyScheduleTypeRepository;
import cp.smile.user.repository.UserJoinStudyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static cp.smile.config.response.exception.CustomExceptionStatus.*;

@RequiredArgsConstructor
@Transactional
@Service
public class StudyScheduleServiceImpl implements StudyScheduleService{

    private final StudyScheduleRepository studyScheduleRepository;
    private final StudyScheduleTypeRepository studyScheduleTypeRepository;
    private final StudyCommonRepository studyCommonRepository;
    private final UserJoinStudyRepository userJoinStudyRepository;

    // TODO : 요청 유저가 스터디에 속했는지 판단하는 로직은 가능하면 aop로 공통처리하도록 해야됨.

    /*일정전체 조회*/
    @Override
    public List<ScheduleDTO> findAllSchedule(int userId, int studyId) {

        UserJoinStudyId userJoinStudyId = UserJoinStudyId.builder()
                .userId(userId)
                .studyInformationId(studyId).build();

        //요청한 유저와, 스터디 정보로 조회해서 유저 가입정보에 값이 있으면 올바른 요청
        userJoinStudyRepository
                .findById(userJoinStudyId)
                .orElseThrow(() -> new CustomException(USER_NOT_ACCESS_STUDY));

        //스터디 조회
        StudyInformation studyInformation = studyCommonRepository
                .findById(studyId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_STUDY));

        //전체 조회
        List<StudySchedule> studySchedules = studyScheduleRepository
                .findAllByStudyId(studyInformation)
                .orElse(new ArrayList<>());

        //DTO로 변환
        List<ScheduleDTO> scheduleDTOS = studySchedules.stream()
                .map(StudySchedule::createScheduleDTO)
                .collect(Collectors.toList());


        return scheduleDTOS;
    }

    @Override
    public ScheduleDTO findDetailSchedule(int userId,int studyId,int scheduleId) {

        UserJoinStudyId userJoinStudyId = UserJoinStudyId.builder()
                .userId(userId)
                .studyInformationId(studyId).build();

        //요청한 유저와, 스터디 정보로 조회해서 유저 가입정보에 값이 있으면 올바른 요청
        userJoinStudyRepository
                .findById(userJoinStudyId)
                .orElseThrow(() -> new CustomException(USER_NOT_ACCESS_STUDY));

        //일정 식별자에 해당하는 정보 조회
        StudySchedule studySchedule = studyScheduleRepository
                .findById(scheduleId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_SCHEDULE));

        return studySchedule.createScheduleDTO();
    }

    @Override
    public void createStudySchedule(int userId, CreateScheduleDTO createScheduleDTO) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

        UserJoinStudyId userJoinStudyId = UserJoinStudyId.builder()
                .userId(userId)
                .studyInformationId(createScheduleDTO.getStudyId()).build();


        //TODO : 상황에 맞는 예외 만들어서 던지게 해야됨.
        //요청한 유저와, 스터디 정보로 조회해서 유저 가입정보에 값이 있으면 올바른 요청
        UserJoinStudy userJoinStudy = userJoinStudyRepository
                .findById(userJoinStudyId)
                .orElseThrow(() -> new CustomException(USER_NOT_ACCESS_STUDY));


        //일정유형 조회
        ScheduleType scheduleType = studyScheduleTypeRepository
                .findById(createScheduleDTO.getScheduleTypeId())
                .orElseThrow(() -> new CustomException(NOT_FOUND_SCHEDULE_TYPE));


        //스터디정보 조회
        StudyInformation studyInformation = studyCommonRepository
                .findById(createScheduleDTO.getStudyId())
                .orElseThrow(() -> new CustomException(NOT_FOUND_STUDY));

        //스터디 일정 엔티티에 넣기
        StudySchedule studySchedule = StudySchedule.builder()
                .startTime(LocalDateTime.parse(createScheduleDTO.getStartTime(), formatter))
                .endTime(LocalDateTime.parse(createScheduleDTO.getEndTime(), formatter))
                .name(createScheduleDTO.getTitle())
                .description(createScheduleDTO.getDescription())
                .part(1)
                .url(createScheduleDTO.getUrl())
                .studyInformation(studyInformation)
                .scheduleType(scheduleType)
                .color(createScheduleDTO.getColor())
                .isDeleted(false).build();

        //저장.
        studyScheduleRepository.save(studySchedule);
    }

    @Override
    public void updateStudySchedule(int userId, int studyId, int scheduleId, UpdateScheduleDTO updateScheduleDTO) {
        UserJoinStudy user = userJoinStudyRepository.findByUserIdAndStudyId(userId, studyId)
                .orElseThrow(() -> new CustomException(USER_NOT_ACCESS_STUDY));

        StudySchedule studySchedule = studyScheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_SCHEDULE));
        
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");


        // TODO : 엔티티 안으로 넣도록 수정.
        if (updateScheduleDTO.getStartTime() != null) {
            LocalDateTime startTime = LocalDateTime.parse(updateScheduleDTO.getStartTime(),formatter);
            studySchedule.updateStartTime(startTime);
        }
        if (updateScheduleDTO.getEndTime() != null) {
            LocalDateTime endTime = LocalDateTime.parse(updateScheduleDTO.getEndTime(),formatter);
            studySchedule.updateEndTime(endTime);
        }

        if (updateScheduleDTO.getTypeId() != null) {
            ScheduleType scheduleType = studyScheduleTypeRepository.findById(updateScheduleDTO.getTypeId())
                    .orElseThrow(() -> new CustomException(NOT_FOUND_SCHEDULE_TYPE));
            studySchedule.updateScheduleType(scheduleType);
        }

        if (updateScheduleDTO.getName() != null) {
            studySchedule.updateName(updateScheduleDTO.getName());
        }

        if(updateScheduleDTO.getUrl() != null){
            studySchedule.updateUrl(updateScheduleDTO.getUrl());
        }

        if (updateScheduleDTO.getDescription() != null) {
            studySchedule.updateDescription(updateScheduleDTO.getDescription());
        }
    }

    @Override
    public void deleteStudySchedule(int userId, int studyId, int scheduleId) {
        UserJoinStudy user = userJoinStudyRepository.findByUserIdAndStudyId(userId, studyId)
                .orElseThrow(() -> new CustomException(USER_NOT_ACCESS_STUDY));

        StudySchedule studySchedule = studyScheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_SCHEDULE));

        if (studySchedule.getIsDeleted() == false) {
            studySchedule.deleteSchedule();
        }
    }

    @Override
    public List<ScheduleTypeDTO> findAllType() {
        List<ScheduleType> types = studyScheduleTypeRepository.findAll();
        return types.stream().map(ScheduleTypeDTO::of).collect(Collectors.toList());
    }
}

