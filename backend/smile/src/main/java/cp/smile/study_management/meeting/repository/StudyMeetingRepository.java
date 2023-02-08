package cp.smile.study_management.meeting.repository;

import cp.smile.entity.study_management.StudyMeeting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudyMeetingRepository extends JpaRepository<StudyMeeting, Integer> {
}
