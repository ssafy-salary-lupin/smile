package cp.smile.study_management.board.repository;

import cp.smile.entity.study_management.StudyBoardComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudyBoardCommentRepository extends JpaRepository<StudyBoardComment, Integer> {
}
