package cp.smile.study_management.chat.repository;


import cp.smile.entity.study_common.StudyComment;
import cp.smile.study_common.repository.StudyCommentRepository;
import cp.smile.study_management.chat.dto.ChatRoomDTO;
import cp.smile.study_management.chat.service.RedisSubscriber;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.nio.channels.Channel;
import java.util.*;

@RequiredArgsConstructor
@Repository
public class ChatRepositoryImpl implements ChatRepository{

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
    private Map<String, ChannelTopic> topicMap;

    /*객체 생성 이전에 레디스 , Map 등의 자료구조 먼저 생성*/
    @PostConstruct
    public void init(){
        opsHashChatRoom = redisTemplate.opsForHash();
        topicMap = new HashMap<>();
    }

    /*스터디 Id(roomId)로 채팅방 찾기*/
    @Override
    public Optional<ChatRoomDTO> findChatRoomById(String roomId) {
        return Optional.of(opsHashChatRoom.get(CHAT_ROOMS,roomId)); //레디스 자료구조에서 채팅방 정보 가져오기.
    }

    /*레디스에 저장 후,채팅방 객체를 반환하지 않음 - 채팅방 조회를 따로 호출해야 채팅방 객체를 리턴함.*/
    @Override
    public void saveChatRoom(ChatRoomDTO chatRoomDTO) {

        //레디스 Hash에 저장.
        opsHashChatRoom.put(CHAT_ROOMS,String.valueOf(chatRoomDTO.getRoomId()), chatRoomDTO);
    }

    //토픽 가져오기
    @Override
    public Optional<ChannelTopic> findTopic(String roomId){

        return Optional.of(topicMap.get(roomId));

    }

    //토픽 저장 - 저장시에는 리스너와 함께 저장해서 리스너를 통해 호출할 수 있도록 해야 됨.
    @Override
    public void saveTopic(String roomId){
        ChannelTopic topic = new ChannelTopic(roomId);//룸 아이디(스터디 아이디)로 토픽 생성

        redisMessageListener.addMessageListener(redisSubscriber,topic); //발행된 데이터를 매번 확인해야 되기 때문에 리스너 필요.

        //채팅방 별로 토픽 저장해둠.
        topicMap.put(roomId,topic);

    }




}
