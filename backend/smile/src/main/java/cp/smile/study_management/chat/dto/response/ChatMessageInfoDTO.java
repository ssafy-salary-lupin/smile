package cp.smile.study_management.chat.dto.response;

import cp.smile.study_common.dto.response.UserProfileDTO;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

/*모든 */
@Getter
public class ChatMessageInfoDTO {


    private Long id;
    private String message;

    private LocalDateTime sendTime;

    private UserProfileDTO userProfile; //유저 정보


    @Builder
    public ChatMessageInfoDTO(Long id, String message, LocalDateTime sendTime, UserProfileDTO userProfile) {
        this.id = id;
        this.message = message;
        this.sendTime = sendTime;
        this.userProfile = userProfile;
    }
}
