package cp.smile.study_management.chat.repository;

import cp.smile.study_management.chat.dto.ChatRoomDTO;
import org.springframework.data.redis.listener.ChannelTopic;

import java.util.Optional;

public interface ChatRepository {

    Optional<ChatRoomDTO> findChatRoomById(String studyId);

    void saveChatRoom(ChatRoomDTO chatRoomDTO);

    void saveTopic(String roomId);

    ChannelTopic findTopic(String roomId);



}
