package cp.smile.study_management.schedule.repository;

import cp.smile.entity.study_management.ScheduleType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudyScheduleTypeRepository extends JpaRepository<ScheduleType,Integer> {
}
