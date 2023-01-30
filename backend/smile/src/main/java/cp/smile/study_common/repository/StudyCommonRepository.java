package cp.smile.study_common.repository;

import cp.smile.entity.study_common.StudyInformation;
import cp.smile.study_common.dto.response.FindAllStudyDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface StudyCommonRepository extends JpaRepository<StudyInformation, Integer> {

    //스터디 전체 조회 - 모든 스터디(마감안되고(deadline = 0), 종료 안된 것 조회(isEnd = 0))
//    Optional<List<StudyInformation>> findAllByDeadlineAndIsEnd( boolean deadline, boolean isEnd);


    //스터디 전체 조회2
    @Query(value = "select s from StudyInformation s " +
            "left join fetch s.studyType st " +
            "left join fetch s.userJoinStudies ujs " +
            "left join fetch ujs.user " +
            "left join fetch s.studyComments sc " +
            "where s.deadline = false and s.isEnd = false and ujs.isLeader = true")
    Optional<Set<StudyInformation>> findAllByStudyInformation();

    //스터디 생성 - 이미 만들어져 있음


    //스터디 상세 조회



}
