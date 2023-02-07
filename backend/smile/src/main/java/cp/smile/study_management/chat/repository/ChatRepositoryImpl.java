package cp.smile.study_management.chat.repository;


import cp.smile.study_management.chat.dto.ChatRoomDTO;
import cp.smile.study_management.chat.service.RedisSubscriber;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.HashMap;
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

    //레디스가 제공하는 레디스 서버에 레디스명령어를 수행하기 위해 추상화 제공 - 직렬화, 커넥션 관리 등을 수행함.
    //레디스 자료형에 대한 인터페이스를 제공해줌.
    private final RedisTemplate<String,Object> redisTemplate;

    private HashOperations<String,String,ChatRoomDTO> opsHashChatRoom;

    //채팅방 대화 메시지 발행을 위한 레디스의 토픽 정보, 서버별로 채팅방에 매칭되는 토픽정보(스터디 식별자)을 Map에 넣어서 roomId(스터디 식별자)로 찾을 수 있게 함.
    private Map<String, ChannelTopic> topics;

    /*객체 생성 이전에 레디스 , Map 등의 자료구조 먼저 생성*/
    @PostConstruct
    public void init(){
        opsHashChatRoom = redisTemplate.opsForHash();
        topics = new HashMap<>();
    }

    /*스터디 Id(roomId)로 채팅방 찾기*/
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

        //TODO : 수정필요.
        return 1;
    }
}
