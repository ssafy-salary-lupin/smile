package cp.smile.study_management.meeting.controller;

import cp.smile.auth.oauth2.CustomOAuth2User;
import cp.smile.config.response.CommonResponse;
import cp.smile.config.response.DataResponse;
import cp.smile.config.response.ResponseService;
import cp.smile.config.response.exception.CustomException;
import cp.smile.entity.study_common.StudyInformation;
import cp.smile.entity.study_management.StudyMeeting;
import cp.smile.entity.user.User;
import cp.smile.study_common.repository.StudyCommonRepository;
import cp.smile.study_management.meeting.dto.request.AttendRequestDTO;
import cp.smile.study_management.meeting.dto.request.MeetingCreationRequestDTO;
import cp.smile.study_management.meeting.dto.response.AttendTokenDTO;
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

import static cp.smile.config.response.CustomSuccessStatus.*;
import static cp.smile.config.response.exception.CustomExceptionStatus.*;

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

    @PostMapping
    public DataResponse<MeetingDTO> createMeeting(@AuthenticationPrincipal CustomOAuth2User oAuth2User,
                                         @RequestBody MeetingCreationRequestDTO dto,
                                         @PathVariable int studyId) throws OpenViduJavaClientException, OpenViduHttpException {
        checkIsJoinedStudy(oAuth2User.getUserId(), studyId);
        User starter = userRepository.findById(oAuth2User.getUserId())
                .orElseThrow(() -> new CustomException(ACCOUNT_NOT_FOUND));

        StudyInformation study = studyCommonRepository.findById(studyId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_STUDY));

        StudyMeeting meeting = studyMeetingService.createMeeting(starter, study, dto);
        String sessionId = openViduService.createSession(String.valueOf(studyId));

        return responseService.getDataResponse(new MeetingDTO(sessionId, meeting), RESPONSE_SUCCESS);
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
    public CommonResponse closeMeeting(@PathVariable String studyId) throws OpenViduJavaClientException, OpenViduHttpException {
        openViduService.closeSession(studyId);
        return responseService.getSuccessResponse();
    }


    private boolean checkIsJoinedStudy(int userId, int studyId) {
        return userJoinStudyRepository.findByUserIdAndStudyId(userId, studyId).isPresent();
    }
}
