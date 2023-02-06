package cp.smile.study_management.chat.repository;

import cp.smile.study_management.chat.dto.ChatRoomDTO;

import java.util.Optional;

public interface ChatRepository {

    Optional<ChatRoomDTO> findChatRoomById(int studyId);

    int createChatRoom(int studyId);


}
