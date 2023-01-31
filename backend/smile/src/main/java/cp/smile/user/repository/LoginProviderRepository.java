package cp.smile.user.repository;

import cp.smile.entity.user.LoginProvider;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginProviderRepository extends JpaRepository<LoginProvider, Integer> {

}
