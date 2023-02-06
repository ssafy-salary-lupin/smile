package cp.smile.study_management.meeting.controller;

import cp.smile.auth.oauth2.CustomOAuth2User;
import cp.smile.config.response.DataResponse;
import cp.smile.config.response.ResponseService;
import cp.smile.study_management.meeting.dto.request.MeetingCreationRequestDTO;
import cp.smile.study_management.meeting.dto.response.MeetingCreationDTO;
import cp.smile.user.repository.UserJoinStudyRepository;
import cp.smile.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/studies/{studyId}/meetings")
@RequiredArgsConstructor
public class MeetingController {

    private final ResponseService responseService;
    private final UserRepository userRepository;
    private final UserJoinStudyRepository userJoinStudyRepository;

    @PostMapping
    public DataResponse<MeetingCreationDTO> createMeeting(
            @AuthenticationPrincipal CustomOAuth2User oAuth2User,
            @RequestBody MeetingCreationRequestDTO dto,
            @PathVariable int studyId) {
        checkIsJoinedStudy(oAuth2User.getUserId(), studyId);
        return null;
    }

    private boolean checkIsJoinedStudy(int userId, int studyId) {
        return userJoinStudyRepository.findByUserIdAndStudyId(userId, studyId).isPresent();
    }
}
