package cp.smile.study_common.repository;

import cp.smile.entity.study_common.StudyInformation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudyCommonRepository extends JpaRepository<StudyInformation, Integer> {

    //스터디 전체 조회 - 모든 스터디(마감안되고(deadline = 0), 종료 안된 것 조회(isEnd = 0))
    List<StudyInformation> findAllByDeadlineAndisEnd(boolean deadline, boolean isEnd);

    //스터디 생성 - 이미 만들어져 있음.


    //스터디 상세 조회



}
