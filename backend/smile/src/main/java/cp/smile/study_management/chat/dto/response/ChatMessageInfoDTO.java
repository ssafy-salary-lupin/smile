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


    private String  type; //메시지 타입
    private int roomId; //방 번호 - 스터디 식별자
    private int senderId; //메시지를 보낸 사람 - 유저 식별자.

    private String senderName; //식별자 이름.

    private String message; //메시지

    @Builder
    public ChatMessageInfoDTO(String type, int roomId, int senderId, String senderName, String message) {
        this.type = type;
        this.roomId = roomId;
        this.senderId = senderId;
        this.senderName = senderName;
        this.message = message;
    }
}
