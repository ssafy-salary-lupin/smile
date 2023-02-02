package cp.smile.config;

import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

import java.util.Optional;

/**
 * CreatedBy, LastModifiedBY를 생성하는 클래스
 */
@Component
public class UserAuditorAware implements AuditorAware<Integer> {


    // TODO : 추후에 리턴되는 id를 세션에서 가져오도록 변경필요, 개발단계에서는 1을 고정적으로 넣도록 함.
    @Override
    public Optional<Integer> getCurrentAuditor() {
        return Optional.ofNullable(1);
    }
}
