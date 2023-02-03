package cp.smile.study_management.chat.dto;

import cp.smile.study_management.chat.service.ChatService;
import cp.smile.study_management.chat.service.ChatServiceImpl;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashSet;
import java.util.Set;

@Getter
public class ChatRoomDTO {

    private int roomId; //방번호 - 스터디 식별자.
    private String name; // 방이름 - 스터디 이름

    @Builder
    public ChatRoomDTO(int roomId, String name) {
        this.roomId = roomId;
        this.name = name;
    }
}
