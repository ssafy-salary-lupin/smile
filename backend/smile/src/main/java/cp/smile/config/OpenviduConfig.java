package cp.smile.config;

import io.openvidu.java.client.OpenVidu;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenviduConfig {

    private final String OPENVIDU_URL;
    private final String OPENVIDU_SECRET;

    public OpenviduConfig(@Value("${openvidu.https.url}") String url,
                          @Value("${openvidu.https.secret}") String secret) {
        this.OPENVIDU_URL = url;
        this.OPENVIDU_SECRET = secret;
    }

    @Bean
    public OpenVidu openVidu() {
        return new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }
}
