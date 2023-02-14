package cp.smile.user.repository;

import cp.smile.entity.user.UserMemo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserMemoRepository extends JpaRepository<UserMemo, Integer> {

    List<UserMemo> findByUserIdAndIsDeletedFalse(int userId);

    Optional<UserMemo> findByIdAndIsDeletedFalse(int memoId);
}
