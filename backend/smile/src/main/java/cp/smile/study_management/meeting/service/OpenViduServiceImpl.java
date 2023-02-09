package cp.smile.study_management.meeting.service;

import cp.smile.config.response.exception.CustomException;
import cp.smile.config.response.exception.CustomExceptionStatus;
import cp.smile.study_management.meeting.dto.request.AttendRequestDTO;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Map;

import static cp.smile.config.response.exception.CustomExceptionStatus.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class OpenViduServiceImpl implements OpenViduService{

    private static final int MAX_ENTER_PERSON = 6;
    private final OpenVidu openVidu;

    @Override
    public String createSession(String customSessionId) throws OpenViduJavaClientException, OpenViduHttpException {
        openVidu.fetch();
        if (openVidu.getActiveSession(customSessionId) != null) {
            throw new CustomException(STUDY_EXISTS_MEETING);
        }
        SessionProperties properties = SessionProperties.fromJson(null).customSessionId(customSessionId).build();
        return openVidu.createSession(properties).getSessionId();
    }

    @Override
    public String createConnectionToken(String sessionId, AttendRequestDTO dto) throws OpenViduJavaClientException, OpenViduHttpException {
        openVidu.fetch();
        Session session = openVidu.getActiveSession(sessionId);
        if (session == null) {
            session = openVidu.getActiveSession(createSession(sessionId));
        }

        if (session.getConnections().size() > MAX_ENTER_PERSON) {
            throw new CustomException(OVER_MAX_SIZE_PERSON);
        }

        ConnectionProperties properties;

        if (dto != null) {
            properties = ConnectionProperties.fromJson(dto.toMap()).build();
        } else properties = ConnectionProperties.fromJson(null).build();

        return session.createConnection(properties).getToken();
    }

    @Override
    public void closeSession(String sessionId) throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = openVidu.getActiveSession(sessionId);

        if (session == null) {
            throw new CustomException(CustomExceptionStatus.NOT_FOUND_MEETING_SESSION);
        }

        session.close();
    }
}
