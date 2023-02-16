package cp.smile.study_management.chat.service;

import cp.smile.config.response.exception.CustomException;
import cp.smile.config.response.exception.CustomExceptionStatus;
import cp.smile.entity.study_common.StudyInformation;
import cp.smile.entity.study_management.ChatMessage;
import cp.smile.entity.user.User;
import cp.smile.study_common.repository.StudyCommonRepository;
import cp.smile.study_management.chat.dto.ChatMessageDTO;
import cp.smile.study_management.chat.repository.ChatMessageRepository;
import cp.smile.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

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

        //유저 조회
        User user = userRepository
                .findById(chatMessageDTO.getSenderId())
                .orElseThrow(() -> new CustomException(ACCOUNT_NOT_FOUND));

        //해당 스터디 조회.
        StudyInformation studyInformation = studyCommonRepository
                .findById(chatMessageDTO.getRoomId())
                .orElseThrow(() -> new CustomException(NOT_FOUND_STUDY));


        // TODO : cm_session값은 현재 쓰고 있지 않아서, 입장인지, 메시지인지 처리하는 용도로 사용 (ENTER, TALK)
        //메시지 저장.
        ChatMessage chatMessage = ChatMessage.builder()
                .content(chatMessageDTO.getMessage())
                .sendTime(LocalDateTime.now())
                .session(chatMessageDTO.getType().toString())
                .user(user)
                .studyInformation(studyInformation).build();

        chatMessageRepository.save(chatMessage);
    }
}
