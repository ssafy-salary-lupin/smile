package cp.smile.study_management.meeting.repository;

import cp.smile.entity.study_management.StudyMeetingType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudyMeetingTypeRepository extends JpaRepository<StudyMeetingType, Integer> {
}
