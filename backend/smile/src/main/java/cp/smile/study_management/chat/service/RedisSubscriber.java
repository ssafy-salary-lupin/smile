package cp.smile.study_management.chat.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import cp.smile.study_management.chat.dto.ChatMessageDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

/*구독 서비스*/

@RequiredArgsConstructor
@Slf4j
@Service
public class RedisSubscriber implements MessageListener {

    private final ObjectMapper objectMapper;
    private final RedisTemplate redisTemplate;
    private final SimpMessageSendingOperations messageTemplate;//메시지를 도착지 까지 보내는 역할


    @Override
    public void onMessage(Message message, byte[] pattern) {
        try{
            String publishMessage = (String) redisTemplate.getStringSerializer().deserialize(message.getBody());

            ChatMessageDTO roomMessage = objectMapper.readValue(publishMessage,ChatMessageDTO.class); //발행된 메시지 매핑

            messageTemplate.convertAndSend("/sub/chat/room/" + roomMessage.getRoomId(), roomMessage);
        }
        catch (Exception e){
            log.error(e.getMessage());
            throw new RuntimeException(); //런타임 예외 던지기
        }
    }
}
