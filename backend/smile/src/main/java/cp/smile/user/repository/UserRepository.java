package cp.smile.user.repository;

import cp.smile.entity.user.LoginProvider;
import cp.smile.entity.user.User;
import cp.smile.user.dto.response.UserInfoDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;


@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

}
