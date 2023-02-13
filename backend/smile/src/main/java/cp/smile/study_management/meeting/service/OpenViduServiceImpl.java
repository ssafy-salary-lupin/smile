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
        log.info("{} : {}", customSessionId, openVidu.getActiveSession(customSessionId));
        if (openVidu.getActiveSession(customSessionId) != null) {
            log.info("{} is not null", customSessionId);
            throw new CustomException(STUDY_EXISTS_MEETING);
        }
        SessionProperties properties = SessionProperties.fromJson(null).customSessionId(customSessionId).build();
        Session session = openVidu.createSession(properties);
        log.info("session created");
        return session.getSessionId();
    }

    @Override
    public String createConnectionToken(String sessionId, AttendRequestDTO dto) throws OpenViduJavaClientException, OpenViduHttpException {
        openVidu.fetch();
        Session session = openVidu.getActiveSession(sessionId);

        if (session == null) {
            throw new CustomException(NOT_FOUND_MEETING_SESSION);
        }

        if (session.getConnections().size() > MAX_ENTER_PERSON) {
            throw new CustomException(OVER_MAX_SIZE_PERSON);
        }

//        ConnectionProperties properties;
//
//        if (dto != null) {
//            properties = ConnectionProperties.fromJson(dto.toMap()).build();
//        } else properties = ConnectionProperties.fromJson(null).build();

        ConnectionProperties properties = new ConnectionProperties.Builder().record(false).build();
        return session.createConnection(properties).getToken();
    }

    @Override
    public void closeSession(String sessionId) throws OpenViduJavaClientException, OpenViduHttpException {
        openVidu.fetch();
        Session session = openVidu.getActiveSession(sessionId);

        if (session == null) {
            throw new CustomException(CustomExceptionStatus.NOT_FOUND_MEETING_SESSION);
        }

        if (!session.getConnections().isEmpty()) {
            throw new CustomException(CONNECTED_CONNECTION_EXISTS);
        }

        session.close();
    }

    @Override
    public boolean existsSession(String sessionId) throws OpenViduJavaClientException, OpenViduHttpException {
        openVidu.fetch();
        return openVidu.getActiveSession(sessionId) != null;
    }
}
