package cp.smile.study_management.board.repository;

import cp.smile.entity.study_management.StudyBoard;
import cp.smile.entity.study_management.StudyBoardComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StudyBoardCommentRepository extends JpaRepository<StudyBoardComment, Integer> {

    @Query(value = "select sbm from StudyBoardComment sbm " +
            "join fetch sbm.user " +
            "where sbm.studyBoard = :studyBoard")
    List<StudyBoardComment> findByStudyBoardWithUser(StudyBoard studyBoard);
}
