package cp.smile.study_common.repository;

import cp.smile.entity.study_common.StudyInformation;
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

    /*스터디 생성 */

    //스터디 정보 테이블에 넣기 - save 함수가 구현되어있음.

    //유저 스터디 가입 정보 테이블에 넣기.


    /*스터디 상세 조회*/

    //스터디 id로 스터디 정보, 스터디장 조회.

    //스터디 id에 해당하는 댓글 - 대댓글 정보 가져오기.



}
