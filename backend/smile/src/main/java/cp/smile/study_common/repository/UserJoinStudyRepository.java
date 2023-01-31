package cp.smile.study_common.repository;

import cp.smile.entity.user.UserJoinStudy;
import org.springframework.data.jpa.repository.JpaRepository;

// TODO : 유저 스터디 가입 레포지토리로, 유저 도메인 쪽으로 옮길 예정.
public interface UserJoinStudyRepository extends JpaRepository<UserJoinStudy,Integer> {


}
