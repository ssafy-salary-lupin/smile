package cp.smile.study_management.schedule.repository;

import cp.smile.entity.study_common.StudyInformation;
import cp.smile.entity.study_management.StudySchedule;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface StudyScheduleRepository extends JpaRepository<StudySchedule,Integer> {

    @Query(value = "select s from StudySchedule s " +
            "left join fetch s.scheduleType " +
            "where s.studyInformation = :studyInformation and s.isDeleted = false")
    Optional<List<StudySchedule>> findAllByStudyId(@Param(value = "studyInformation") StudyInformation studyInformation);

    //현재시간을 입력받아서 종료시간이 현재시간 초과인것만 찾고, 그중 5개만 조회.

    @Query(value = "select s from StudySchedule s " +
            "where s.endTime >= :currentTime and s.studyInformation = :studyId and s.isDeleted = false " +
            "order by s.endTime DESC")
    Optional<List<StudySchedule>> findAllByEndTimeLimit5(@Param("currentTime") LocalDateTime currentTime, @Param("studyId") StudyInformation studyInformation, Pageable pageable);


    Optional<StudySchedule> findByIdAndIsDeletedFalse(int studyScheduleId);

}
