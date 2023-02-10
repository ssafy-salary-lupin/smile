package cp.smile.study_management.schedule.repository;

import cp.smile.entity.study_common.StudyInformation;
import cp.smile.entity.study_management.StudySchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StudyScheduleRepository extends JpaRepository<StudySchedule,Integer> {

    @Query(value = "select s from StudySchedule s " +
            "left join fetch s.scheduleType " +
            "where s.studyInformation = :studyInformation")
    Optional<List<StudySchedule>> findAllByStudyId(@Param(value = "studyInformation") StudyInformation studyInformation);
}
