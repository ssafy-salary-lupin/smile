package cp.smile.study_common.repository;

import cp.smile.entity.study_common.StudyInformation;
import cp.smile.entity.study_common.StudyType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface StudyCommonRepository extends JpaRepository<StudyInformation, Integer> {

    //스터디 전체 조회 - 모든 스터디(마감안되고(deadline = 0), 종료 안된 것 조회(isEnd = 0))
//    Optional<List<StudyInformation>> findAllByDeadlineAndIsEnd( boolean deadline, boolean isEnd);


    //스터디 전체 조회
    @Query(value = "select s from StudyInformation s " +
            "left join fetch s.studyType st " +
            "left join fetch s.userJoinStudies ujs " +
            "left join fetch s.studyComments sc " +
            "left join fetch ujs.user " +
            "where s.deadline = false and s.isEnd = false and ujs.isDeleted = false ")
    Set<StudyInformation> findAllByStudyInformation();

    /**검색조건이 name 하나일때*/
    @Query(value = "select s from StudyInformation s " +
            "left join fetch s.studyType st " +
            "left join fetch s.userJoinStudies ujs " +
            "left join fetch s.studyComments sc " +
            "left join fetch ujs.user " +
            "where s.deadline = false and s.isEnd = false and ujs.isLeader = true " +
            "and s.name like %:name%")
    Set<StudyInformation> findAllByNameIsContaining(@Param("name") String name);


    /** 검색 조건이 type 하나일 때*/
    @Query(value = "select s from StudyInformation s " +
            "left join fetch s.studyType st " +
            "left join fetch s.userJoinStudies ujs " +
            "left join fetch s.studyComments sc " +
            "left join fetch ujs.user " +
            "where s.deadline = false and s.isEnd = false and ujs.isLeader = true " +
            "and st.id = :typeId")
    Set<StudyInformation> findAllByStudyType(@Param("typeId") int studyTypeId);


    /** 검색 조건이 둘다 일때.*/
    @Query(value = "select s from StudyInformation s " +
            "left join fetch s.studyType st " +
            "left join fetch s.userJoinStudies ujs " +
            "left join fetch s.studyComments sc " +
            "left join fetch ujs.user " +
            "where s.deadline = false and s.isEnd = false and ujs.isLeader = true " +
            "and s.name like %:name% and st.id = :typeId")
    Set<StudyInformation> findAllByNameIsContainingAndStudyType(@Param("name") String name, @Param("typeId") int studyTypeId);


    /*로그인 한 사용자 기준 - */




}
