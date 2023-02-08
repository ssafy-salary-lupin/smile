package cp.smile.study_management.meeting.service;

import cp.smile.entity.study_common.StudyInformation;
import cp.smile.entity.study_management.StudyMeeting;
import cp.smile.entity.study_management.StudyMeetingStatus;
import cp.smile.entity.study_management.StudyMeetingType;
import cp.smile.entity.user.User;
import cp.smile.study_management.meeting.dto.request.MeetingCreationRequestDTO;
import cp.smile.study_management.meeting.repository.StudyMeetingRepository;
import cp.smile.study_management.meeting.repository.StudyMeetingTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StudyMeetingServiceImpl implements StudyMeetingService{

    private final StudyMeetingRepository studyMeetingRepository;
    private final StudyMeetingTypeRepository studyMeetingTypeRepository;

    @Override
    @Transactional
    public StudyMeeting createMeeting(User starter, StudyInformation study, MeetingCreationRequestDTO dto) {
        StudyMeetingType studyMeetingType = studyMeetingTypeRepository.findById(dto.getMeetingTypeId())
                .orElseThrow(() -> new EntityNotFoundException(dto.getMeetingTypeId() + "에 해당하는 타입이 없습니다."));

        StudyMeeting meeting = StudyMeeting.builder()
                .studyMeetingType(studyMeetingType)
                .name(dto.getMeetingName())
                .user(starter)
                .studyInformation(study)
                .isEnd(StudyMeetingStatus.proceeding.getCode())
                .build();

        return studyMeetingRepository.save(meeting);
    }
}
