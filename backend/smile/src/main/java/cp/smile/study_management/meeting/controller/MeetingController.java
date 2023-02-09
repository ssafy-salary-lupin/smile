package cp.smile.study_management.meeting.controller;

import cp.smile.auth.oauth2.CustomOAuth2User;
import cp.smile.config.response.CommonResponse;
import cp.smile.config.response.CustomSuccessStatus;
import cp.smile.config.response.DataResponse;
import cp.smile.config.response.ResponseService;
import cp.smile.entity.study_common.StudyInformation;
import cp.smile.entity.study_management.StudyMeeting;
import cp.smile.entity.user.User;
import cp.smile.study_common.repository.StudyCommonRepository;
import cp.smile.study_management.meeting.dto.request.AttendRequestDTO;
import cp.smile.study_management.meeting.dto.request.MeetingCreationRequestDTO;
import cp.smile.study_management.meeting.dto.response.AttendTokenDTO;
import cp.smile.study_management.meeting.dto.response.MeetingCreationDTO;
import cp.smile.study_management.meeting.dto.response.MeetingDTO;
import cp.smile.study_management.meeting.service.OpenViduService;
import cp.smile.study_management.meeting.service.StudyMeetingService;
import cp.smile.user.repository.UserJoinStudyRepository;
import cp.smile.user.repository.UserRepository;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static cp.smile.config.response.CustomSuccessStatus.*;

@RestController
@RequestMapping("/studies/{studyId}/meetings")
@RequiredArgsConstructor
public class MeetingController {

    private final ResponseService responseService;
    private final UserRepository userRepository;
    private final StudyCommonRepository studyCommonRepository;
    private final UserJoinStudyRepository userJoinStudyRepository;
    private final StudyMeetingService studyMeetingService;
    private final OpenViduService openViduService;

    @GetMapping
    public DataResponse<Map<String, Object>> getAllMeeting(
            @AuthenticationPrincipal CustomOAuth2User oAuth2User,
            @PathVariable int studyId) {
        checkIsJoinedStudy(oAuth2User.getUserId(), studyId);

        List<MeetingDTO> list = studyMeetingService.findByStudyId(studyId)
                .stream().map(sm -> new MeetingDTO(String.valueOf(studyId), sm))
                .collect(Collectors.toList());

        Map<String, Object> result = new HashMap<>();
        result.put("meetings", list);

        CustomSuccessStatus status = list.isEmpty() ? RESPONSE_NO_CONTENT : RESPONSE_SUCCESS;

        return responseService.getDataResponse(result, status);
    }

    @GetMapping("/{meetingId}")
    public DataResponse<MeetingDTO> getById(
            @AuthenticationPrincipal CustomOAuth2User oAuth2User,
            @PathVariable int studyId,
            @PathVariable int meetingId
    ) {
        checkIsJoinedStudy(oAuth2User.getUserId(), studyId);
        StudyMeeting meeting = studyMeetingService.findById(meetingId);
        return responseService.getDataResponse(new MeetingDTO(String.valueOf(studyId), meeting), RESPONSE_SUCCESS);
    }

    @PostMapping
    public DataResponse<MeetingCreationDTO> createMeeting(
            @AuthenticationPrincipal CustomOAuth2User oAuth2User,
            @RequestBody MeetingCreationRequestDTO dto,
            @PathVariable int studyId) throws OpenViduJavaClientException, OpenViduHttpException {
        checkIsJoinedStudy(oAuth2User.getUserId(), studyId);
        User starter = userRepository.findById(oAuth2User.getUserId())
                .orElseThrow(() -> new EntityNotFoundException(oAuth2User.getUserId() + "에 해당하는 사용자가 없습니다"));

        StudyInformation study = studyCommonRepository.findById(studyId)
                .orElseThrow(() -> new EntityNotFoundException(studyId + "에 해당하는 스터디가 없습니다"));

        String sessionId = openViduService.createSession(String.valueOf(studyId));
        StudyMeeting meeting = studyMeetingService.createMeeting(starter, study, dto);
        String connection = openViduService.createConnectionToken(sessionId, null);

        MeetingCreationDTO response = new MeetingCreationDTO(
                new MeetingDTO(sessionId, meeting), new AttendTokenDTO(sessionId, connection));

        return responseService.getDataResponse(response, RESPONSE_SUCCESS);
    }

    @PostMapping("/connection")
    public DataResponse<AttendTokenDTO> createConnection(
            @AuthenticationPrincipal CustomOAuth2User oAuth2User,
            @PathVariable int studyId,
            @RequestBody(required = false) AttendRequestDTO dto)
            throws OpenViduJavaClientException, OpenViduHttpException {
        checkIsJoinedStudy(oAuth2User.getUserId(), studyId);

        String sessionId = String.valueOf(studyId);
        String connection = openViduService.createConnectionToken(sessionId, dto);

        return responseService.getDataResponse(new AttendTokenDTO(sessionId, connection), RESPONSE_SUCCESS);
    }

    @DeleteMapping
    public CommonResponse closeMeeting(@PathVariable int studyId) throws OpenViduJavaClientException, OpenViduHttpException {
        openViduService.closeSession(String.valueOf(studyId));
        studyMeetingService.closeMeeting(studyId);
        return responseService.getSuccessResponse();
    }


    private boolean checkIsJoinedStudy(int userId, int studyId) {
        return userJoinStudyRepository.findByUserIdAndStudyId(userId, studyId).isPresent();
    }
}
