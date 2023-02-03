package cp.smile.study_management.chat.dto;

//채팅 메시지를 주고받기 위한 DTO

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessageDTO {

    public enum MessageType{
        ENTER,TALK
    }

    private MessageType type; //메시지 타입
    private int roomId; //방 번호 - 스터디 식별자
    private int senderId; //메시지를 보낸 사람 - 유저 식별자.

    private String senderName; //식별자 이름.

    private String message; //메시지

}
