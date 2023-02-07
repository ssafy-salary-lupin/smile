package cp.smile.study_management.chat.service;

import cp.smile.study_management.chat.dto.ChatRoomDTO;
import cp.smile.study_management.chat.dto.response.ChatMessageInfoDTO;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.web.socket.WebSocketSession;

import java.util.List;

public interface ChatService {

    void createRoom(int studyId); //채팅방 생성

    ChatRoomDTO findRoomById(int studyId); //방 객체 조회 - 참가자들의 웹소켓 세션이 담겨있음.

    void enterChatRoom(int studyId);

    ChannelTopic getTopic(int studyId);

    List<ChatMessageInfoDTO> findAllMessage(int userId, int studyId); //모든 메시지 조회.

    <T> void sendMessage(WebSocketSession session, T message); //연결된 모든 세션에 데이터 보내기.
}
