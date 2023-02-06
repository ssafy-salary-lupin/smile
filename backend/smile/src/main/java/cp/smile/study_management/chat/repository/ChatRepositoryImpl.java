package cp.smile.study_management.chat.repository;


import cp.smile.study_management.chat.dto.ChatRoomDTO;
import cp.smile.study_management.chat.service.RedisSubscriber;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class ChatRepositoryImpl implements ChatRepository{

    // TODO : DB에서 방을 조회해오는 식으로 바꿔야됨.
    private Map<Integer, ChatRoomDTO> chatRoomDTOS;


    //채팅방id(Topic)에서 발생되는 메시지를 처리할 listener
    private final RedisMessageListenerContainer redisMessageListener;
    //구독 처리 서비스
    private final RedisSubscriber redisSubscriber;

    //레디스에서 제공하는 Hash Type의 key 값으로 쓸 값
    //value가 자바의 map 구조가 됨.
    private static final String CHAT_ROOMS = "CHAT_ROOM";
    private final RedisTemplate<String,Object>



    @PostConstruct
    public void init(){
        chatRoomDTOS = new LinkedHashMap<>();
    }

    @Override
    public Optional<ChatRoomDTO> findChatRoomById(int studyId) {
        return Optional.of(chatRoomDTOS.get(studyId));
    }

    @Override
    public int createChatRoom(int studyId) {

        ChatRoomDTO chatRoomDTO = ChatRoomDTO.builder()
                .roomId(studyId)
                .name("방이름" + studyId).build();

        //방생성이 되었으면 메모리 디비(map 자료구조에 저장.)
        chatRoomDTOS.put(studyId,chatRoomDTO);
    }
}
