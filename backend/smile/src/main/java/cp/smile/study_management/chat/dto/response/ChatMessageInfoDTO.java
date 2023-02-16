package cp.smile.study_management.chat.dto.response;

import cp.smile.study_common.dto.response.UserProfileDTO;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/*모든 */
@Getter
public class ChatMessageInfoDTO {


    private Long id;
    private String message;

    private String sendTime;

    private UserProfileDTO userProfile; //유저 정보

    private String type; //입장인지 메시지 요청인지

    @Builder
    public ChatMessageInfoDTO(Long id, String message, String sendTime, UserProfileDTO userProfile, String type) {

        this.id = id;
        this.message = message;
        this.sendTime = sendTime;
        this.userProfile = userProfile;
        this.type = type;
    }
}
