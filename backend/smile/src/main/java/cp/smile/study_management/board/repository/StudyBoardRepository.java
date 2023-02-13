package cp.smile.study_management.board.repository;

import cp.smile.entity.study_management.StudyBoard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface StudyBoardRepository extends JpaRepository<StudyBoard, Integer> {

    @Query(value = "select sb from StudyBoard sb " +
            "join fetch sb.studyInformation si " +
            "join fetch sb.user u " +
            "join fetch sb.studyBoardType sbt " +
            "where si.id = :studyId and sb.isDeleted = false")
    List<StudyBoard> findByStudyId(int studyId);

    // TODO : queryDsl을 이용해서 동적쿼리를 짜지 않아, 조건만 다른 쿼리를 두번짜야됨. - querydsl을 이용한 동적쿼리 필요.
    @Query(value = "select sb from StudyBoard sb " +
            "join fetch sb.studyInformation si " +
            "join fetch sb.user u " +
            "join fetch sb.studyBoardType sbt " +
            "where si.id = :studyId and sb.isDeleted = false " +
            "and sbt.id != 1 " +
            "order by sb.createTime DESC",
            countQuery = "select count(*) from StudyBoard sb " +
                    "where sb.studyInformation.id = :studyId " +
                    "and sb.isDeleted = false " +
                    "and sb.studyBoardType.id != 1")
    Page<StudyBoard> findByStudyIdWithPaging(int studyId, Pageable pageable);

    /*공지사항 조회*/
    @Query(value = "select sb from StudyBoard sb " +
            "join fetch sb.studyInformation si " +
            "join fetch sb.user u " +
            "join fetch sb.studyBoardType sbt " +
            "where si.id = :studyId " +
            "and sb.isDeleted = false " +
            "and sbt.id = 1 " +
            "order by sb.createTime DESC",
            countQuery = "select count(*) from StudyBoard sb where sb.studyInformation.id = :studyId and sb.isDeleted = false and sb.studyBoardType.id != 1")
    Page<StudyBoard> findByStudyIdWithPagingNotice(int studyId, Pageable pageable);

    @Query(value = "select sb from StudyBoard sb " +
            "join fetch sb.studyBoardType " +
            "where sb.id = :studyBoardId")
    Optional<StudyBoard> findByIdWithType(int studyBoardId);

    Optional<StudyBoard> findByIdAndIsDeletedFalse(int studyBoardId);
}
