package cp.smile.study_management.board.repository;

import cp.smile.entity.study_management.StudyBoard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StudyBoardRepository extends JpaRepository<StudyBoard, Integer> {

    @Query(value = "select sb from StudyBoard sb " +
            "join fetch sb.studyInformation si " +
            "join fetch sb.user u " +
            "join fetch sb.studyBoardType sbt " +
            "where si.id = :studyId")
    List<StudyBoard> findByStudyId(int studyId);

    @Query(value = "select sb from StudyBoard sb " +
            "join fetch sb.studyInformation si " +
            "join fetch sb.user u " +
            "join fetch sb.studyBoardType sbt " +
            "where si.id = :studyId",
            countQuery = "select count(*) from StudyBoard sb where sb.studyInformation.id = :studyId")
    Page<StudyBoard> findByStudyIdWithPaging(int studyId, Pageable pageable);
}
