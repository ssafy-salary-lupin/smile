package cp.smile.study_management.meeting.service;

import cp.smile.study_management.meeting.dto.request.AttendRequestDTO;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class OpenViduServiceImpl implements OpenViduService{

    private final OpenVidu openVidu;

    @Override
    public String createSession(String customSessionId) throws OpenViduJavaClientException, OpenViduHttpException {
        SessionProperties properties = SessionProperties.fromJson(null).customSessionId(customSessionId).build();
        return openVidu.createSession(properties).getSessionId();
    }

    @Override
    public String createConnectionToken(String sessionId, AttendRequestDTO dto) throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = openVidu.getActiveSession(sessionId);
        if (session == null) {
            throw new RuntimeException("존재하지 않는 세션입니다.");
        }

        ConnectionProperties properties = ConnectionProperties.fromJson(dto.toMap()).build();
        return session.createConnection(properties).getConnectionId();
    }
}
