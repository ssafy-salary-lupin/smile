package cp.smile.study_management.chat.repository;


import cp.smile.study_management.chat.dto.ChatRoomDTO;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;

@Repository
public class ChatRepositoryImpl implements ChatRepository{

    // TODO : DB에서 방을 조회해오는 식으로 바꿔야됨.
    private Map<Integer, ChatRoomDTO> chatRoomDTOS;

    @PostConstruct
    public void init(){
        chatRoomDTOS = new LinkedHashMap<>();
    }

    @Override
    public Optional<ChatRoomDTO> findChatRoomById(int studyId) {
        return Optional.of(chatRoomDTOS.get(studyId));
    }

    @Override
    public void createChatRoom(int studyId) {

        ChatRoomDTO chatRoomDTO = ChatRoomDTO.builder()
                .roomId(studyId)
                .name("방이름" + studyId).build();

        //방생성이 되었으면 메모리 디비(map 자료구조에 저장.)
        chatRoomDTOS.put(studyId,chatRoomDTO);
    }
}
