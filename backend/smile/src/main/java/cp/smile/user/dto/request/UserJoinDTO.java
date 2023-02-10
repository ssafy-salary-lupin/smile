package cp.smile.user.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserJoinDTO {
    private String email;
    private String nickname;
    private String password;

    @Builder
    public UserJoinDTO(String email, String nickname, String password) {
        this.email = email;
        this.nickname = nickname;
        this.password = password;
    }
}
