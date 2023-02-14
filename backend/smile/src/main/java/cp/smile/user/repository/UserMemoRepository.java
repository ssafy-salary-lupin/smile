package cp.smile.user.repository;

import cp.smile.entity.user.UserMemo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserMemoRepository extends JpaRepository<UserMemo, Integer> {

    List<UserMemo> findByUserIdAndDeletedIsFalse(int userId);
}
