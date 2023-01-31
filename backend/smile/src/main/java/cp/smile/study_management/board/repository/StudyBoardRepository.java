package cp.smile.study_management.board.repository;

import cp.smile.entity.study_management.StudyBoard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudyBoardRepository extends JpaRepository<StudyBoard, Integer> {
}
