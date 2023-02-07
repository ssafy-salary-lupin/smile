package cp.smile.study_management.chat.service;

import cp.smile.study_management.chat.dto.ChatMessageDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

/*메시지 발행하는 서비스*/
@RequiredArgsConstructor
@Service
public class RedisPublisher {

    private final RedisTemplate<String,Object> redisTemplate;

    /*메시지 발행이 발생하면 redis가 처리하는 부분*/
    public void publish(ChannelTopic topic, ChatMessageDTO chatMessageDTO){
        redisTemplate.convertAndSend(topic.getTopic(), chatMessageDTO);
    }
}
