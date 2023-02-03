package cp.smile.entity.user;

import cp.smile.auth.oauth2.provider.OAuth2Provider;
import cp.smile.config.BaseEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor
@Table(name = "login_providers")
public class LoginProvider extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lp_id")
    private int id;
    @Column(name = "lp_provider")
    @Enumerated(EnumType.STRING)
    private OAuth2Provider provider;

    /*인증 제공자 쪽에서 유저 정보를 조회할 일은 없기 때문에 연관관계를 맺지 않음.*/

    @Builder
    public LoginProvider(int id, OAuth2Provider provider) {
        this.id = id;
        this.provider = provider;
    }
}
