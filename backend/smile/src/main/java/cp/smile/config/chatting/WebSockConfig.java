package cp.smile.config.chatting;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker
public class WebSockConfig implements WebSocketMessageBrokerConfigurer {


    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {

        registry.enableSimpleBroker("/sub"); //메시지 구독 요청의 엔드 포인드 prefix
        registry.setApplicationDestinationPrefixes("/pub"); //메시지 발생의 엔드 포인트의 prefix
    }
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws-stomp").setAllowedOriginPatterns("*")
            .withSockJS(); //웹소켓 연결 엔드 포인 설정 - ws://localhost:8080/ws-stomp
    }


}
