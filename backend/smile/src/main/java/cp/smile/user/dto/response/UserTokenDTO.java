package cp.smile.user.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class UserTokenDTO {

    private String accessToken;
    private String refreshToken;

    @Builder
    public UserTokenDTO(String accessToken, String refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}
