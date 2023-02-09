package cp.smile.study_management.meeting.service;

import cp.smile.entity.study_common.StudyInformation;
import cp.smile.entity.study_management.StudyMeeting;
import cp.smile.entity.user.User;
import cp.smile.study_management.meeting.dto.request.MeetingCreationRequestDTO;

import java.util.List;

public interface StudyMeetingService {

    List<StudyMeeting> findByStudyId(int studyId);
    StudyMeeting findById(int meetingId);
    StudyMeeting createMeeting(User starter, StudyInformation study, MeetingCreationRequestDTO dto);

    void closeMeeting(int studyId);
}
