package cp.smile.entity.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import cp.smile.config.BaseEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor
@Table(name = "users")
public class User extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) //DB로 키 자동생성 위임 - mysql에서 사용
    @Column(name = "user_id")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lp_id")
    @JsonIgnore
    private LoginProvider loginProvider; //로그인 인증 제공자 식별자

    @Column(name = "user_password")
    private String password;

    @Column(name = "user_nickname")
    private String nickname;

    @Column(name = "user_email")
    private String email;

    @Column(name = "user_img")
    private String imagePath;

    @Column(name = "user_is_deleted")
    private Boolean isDeleted;
    @Column(name = "user_refresh_token")
    private String refreshToken;

    /*유저정보로 가입된 스터디를 조회하는 요구사항이 있기 때문에 필요함.*/
    @OneToMany(mappedBy = "user")
    List<UserJoinStudy> UserJoinStudy = new ArrayList<>();

    @Builder
    public User(int id, LoginProvider loginProvider, String password, String nickname, String email, String imagePath, Boolean isDeleted, String refreshToken) {
        this.id = id;
        this.loginProvider = loginProvider;
        this.password = password;
        this.nickname = nickname;
        this.email = email;
        this.imagePath = imagePath;
        this.isDeleted = isDeleted;
        this.refreshToken = refreshToken;
    }

    public void addLoginProvider(LoginProvider loginProvider){
        this.loginProvider = loginProvider;
    }

    public void updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
