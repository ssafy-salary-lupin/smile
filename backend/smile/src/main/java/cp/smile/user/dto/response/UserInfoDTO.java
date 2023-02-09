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
    private String imagePath;
    private boolean isDeleted;

    @Builder
    public UserInfoDTO(int id, String nickname, String email, String imagePath, boolean isDeleted) {
        this.id = id;
        this.nickname = nickname;
        this.email = email;
        this.imagePath = imagePath;
        this.isDeleted = isDeleted;
    }
}
