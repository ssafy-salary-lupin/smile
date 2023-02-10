package cp.smile.study_management.home.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserNicknameDTO {
    private int id;
    private String nickname;

    @Builder
    public UserNicknameDTO(int id, String nickname) {
        this.id = id;
        this.nickname = nickname;
    }
}
