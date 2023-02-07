package cp.smile.study_management.chat.dto;

import cp.smile.study_management.chat.service.ChatService;
import cp.smile.study_management.chat.service.ChatServiceImpl;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.socket.WebSocketSession;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;


/*레디스에 저장되는 객체들은 전부 직렬화 되어야 함.*/
@Getter
public class ChatRoomDTO implements Serializable {


    private int roomId; //방번호 - 스터디 식별자.
    private String name; // 방이름 - 스터디 이름

    @Builder
    public ChatRoomDTO(int roomId, String name) {
        this.roomId = roomId;
        this.name = name;
    }


}
