package cp.smile.auth.oauth2.provider;

import cp.smile.entity.user.LoginProvider;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LoginProviderRepository extends JpaRepository<LoginProvider, Long> {

    Optional<LoginProvider> findByProvider(OAuth2Provider provider);
}
