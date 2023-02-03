package cp.smile.study_management.board.repository;

import cp.smile.entity.study_management.StudyBoard;
import cp.smile.entity.study_management.StudyBoardFile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudyBoardFileRepository extends JpaRepository<StudyBoardFile, Integer> {

    List<StudyBoardFile> findByStudyBoard(StudyBoard studyBoard);
}
