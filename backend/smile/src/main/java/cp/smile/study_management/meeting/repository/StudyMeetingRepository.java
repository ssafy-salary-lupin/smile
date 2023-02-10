package cp.smile.study_management.meeting.repository;

import cp.smile.entity.study_management.StudyMeeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface StudyMeetingRepository extends JpaRepository<StudyMeeting, Integer> {

    @Query(value = "select sm from StudyMeeting sm " +
            "join fetch sm.user starter " +
            "join fetch sm.studyMeetingType " +
            "where sm.studyInformation.id = :studyId")
    List<StudyMeeting> findByStudyIdWithStarterAndType(int studyId);

    @Query(value = "select sm from StudyMeeting sm " +
            "join fetch sm.user " +
            "join fetch sm.studyMeetingType " +
            "where sm.id = :meetingId")
    Optional<StudyMeeting> findByIdWithStarterAndType(int meetingId);

    Optional<StudyMeeting> findByStudyInformationIdAndIsEnd(int studyId, int status);
}
