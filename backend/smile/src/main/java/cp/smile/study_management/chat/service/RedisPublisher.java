package cp.smile.study_management.chat.service;

import cp.smile.config.response.exception.CustomException;
import cp.smile.config.response.exception.CustomExceptionStatus;
import cp.smile.entity.study_management.ChatMessage;
import cp.smile.study_common.repository.StudyCommonRepository;
import cp.smile.study_management.chat.dto.ChatMessageDTO;
import cp.smile.study_management.chat.repository.ChatMessageRepository;
import cp.smile.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static cp.smile.config.response.exception.CustomExceptionStatus.*;

/*메시지 발행하는 서비스*/

@Transactional
@RequiredArgsConstructor
@Service
public class RedisPublisher {


    private final ChatMessageRepository chatMessageRepository;
    private final UserRepository userRepository;
    private final StudyCommonRepository studyCommonRepository;
    private final RedisTemplate<String,Object> redisTemplate;

    /*메시지 발행이 발생하면 redis가 처리하는 부분*/
    public void publish(ChannelTopic topic, ChatMessageDTO chatMessageDTO){
        redisTemplate.convertAndSend(topic.getTopic(), chatMessageDTO);

//        //유저 조회
//        userRepository
//                .findById(chatMessageDTO.getRoomId())
//                        .orElseThrow(() -> new CustomException(ACCOUNT_NOT_FOUND));
//
//        //해당 스터디 조회.
//
//        //메시지 저장.
//        ChatMessage.builder()
//                .content()
//                .sendTime()
//                .session()
//                .
    }
}
