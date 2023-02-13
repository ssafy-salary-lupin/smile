package cp.smile.config.redis;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnection;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {

    @Value("${spring.redis.port}")
    private int redisPort;

    @Value("${spring.redis.host}")
    private String redisHost;

    @Bean
    public RedisConnectionFactory redisConnectionFactory(){
        LettuceConnectionFactory lettuceConnectionFactory = new LettuceConnectionFactory(redisHost,redisPort);
        return lettuceConnectionFactory;
    }

    /*redis pub/sub 메시지를 처리하는 listener 설정*/
    @Bean
    public RedisMessageListenerContainer redisMessageListener(){
        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(redisConnectionFactory());
        return container;
    }

    /*애플리케이션에서 사용할  redisTemplate 설정*/
    @Bean
    public RedisTemplate<String,Object> redisTemplate(){
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory());
        redisTemplate.setKeySerializer(new StringRedisSerializer()); //직렬화
        redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(String.class));

        return redisTemplate;
    }

}
