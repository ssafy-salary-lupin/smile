package cp.smile.study_management.meeting.service;

import cp.smile.study_management.meeting.dto.request.AttendRequestDTO;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class OpenViduServiceImpl implements OpenViduService{

    private static final int MAX_ENTER_PERSON = 6;
    private final OpenVidu openVidu;

    @Override
    public String createSession(String customSessionId) throws OpenViduJavaClientException, OpenViduHttpException {
        if (openVidu.getActiveSession(customSessionId) != null) {
            throw new RuntimeException("해당 스터디에 이미 화상회의가 생성되어있습니다.");
        }
        SessionProperties properties = SessionProperties.fromJson(null).customSessionId(customSessionId).build();
        return openVidu.createSession(properties).getSessionId();
    }

    @Override
    public String createConnectionToken(String sessionId, AttendRequestDTO dto) throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = openVidu.getActiveSession(sessionId);
        if (session == null) {
            throw new RuntimeException("존재하지 않는 세션입니다.");
        }

        if (session.getConnections().size() > MAX_ENTER_PERSON) {
            throw new RuntimeException("최대 입장 인원을 초과하였습니다.");
        }

        ConnectionProperties properties;

        if (dto != null) {
            properties = ConnectionProperties.fromJson(dto.toMap()).build();
        } else properties = ConnectionProperties.fromJson(null).build();

        log.info("ConnectionProperties: {}", properties);

        return session.createConnection(properties).getConnectionId();
    }

    @Override
    public void closeSession(String sessionId) throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = openVidu.getActiveSession(sessionId);

        if (session == null) {
            throw new RuntimeException("존재하지 않는 세션입니다.");
        }

        session.close();
    }
}
