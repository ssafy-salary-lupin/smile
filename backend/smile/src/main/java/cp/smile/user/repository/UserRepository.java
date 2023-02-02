package cp.smile.user.repository;

import cp.smile.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

    Optional<User> findById(int id);

    @Query(value = "select u from User u " +
            "join fetch UserJoinStudy ujs " +
            "where ujs.studyInformation.id = :studyId")
    List<User> findUserByStudy(int studyId);
}
