package cp.smile.user.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserUpdateDTO {
    private String nickname;
    private String password;
    private String imagePath;
}
