package cp.smile.user.repository;

import cp.smile.entity.user.UserJoinStudy;
import cp.smile.entity.user.UserJoinStudyId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserJoinStudyRepository extends JpaRepository<UserJoinStudy, UserJoinStudyId> {

    @Query(value = "select ujs from UserJoinStudy ujs " +
            "join fetch ujs.user u " +
            "join fetch ujs.studyInformation si " +
            "where u.id = :userId")
    List<UserJoinStudy> findByUserId(int userId);

    @Query(value = "select ujs from UserJoinStudy ujs " +
            "join fetch ujs.user u " +
            "join fetch ujs.studyInformation si " +
            "where u.id = :userId and si.id = :studyId")
    Optional<UserJoinStudy> findByUserIdAndStudyId(int userId, int studyId);
}
