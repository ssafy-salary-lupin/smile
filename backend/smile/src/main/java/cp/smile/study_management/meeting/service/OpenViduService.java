package cp.smile.study_management.meeting.service;

import cp.smile.study_management.meeting.dto.request.AttendRequestDTO;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;

public interface OpenViduService {

    String createSession(String customSessionId) throws OpenViduJavaClientException, OpenViduHttpException;

    String createConnectionToken(String sessionId, AttendRequestDTO dto) throws OpenViduJavaClientException, OpenViduHttpException;

    void closeSession(String sessionId) throws OpenViduJavaClientException, OpenViduHttpException;
}
