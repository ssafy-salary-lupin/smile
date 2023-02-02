package cp.smile.study_management.board.repository;

import cp.smile.entity.study_management.StudyBoardType;
import cp.smile.entity.study_management.StudyBoardTypeName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudyBoardTypeRepository extends JpaRepository<StudyBoardType, Integer> {
    Optional<StudyBoardType> findByName(StudyBoardTypeName name);
}
