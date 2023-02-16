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


    @Builder
    public ChatMessageInfoDTO(Long id, String message, LocalDateTime sendTime, UserProfileDTO userProfile) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

        this.id = id;
        this.message = message;
        this.sendTime = String.valueOf(LocalDateTime.parse(String.valueOf(sendTime), formatter));
        this.userProfile = userProfile;
    }
}
