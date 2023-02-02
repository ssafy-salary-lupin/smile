package cp.smile.user.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInfoDTO {
    private int id;
    private String nickname;
    private String email;
    private String imgPath;
    private boolean isDeleted;

    @Builder
    public UserInfoDTO(int id, String nickname, String email, String imgPath, boolean isDeleted) {
        this.id = id;
        this.nickname = nickname;
        this.email = email;
        this.imgPath = imgPath;
        this.isDeleted = isDeleted;
    }
}
