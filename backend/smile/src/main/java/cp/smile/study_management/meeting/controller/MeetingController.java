package cp.smile.study_management.meeting.controller;

import cp.smile.auth.oauth2.CustomOAuth2User;
import cp.smile.config.response.CommonResponse;
import cp.smile.config.response.CustomSuccessStatus;
import cp.smile.config.response.DataResponse;
import cp.smile.config.response.ResponseService;
import cp.smile.config.response.exception.CustomException;
import cp.smile.entity.study_common.StudyInformation;
import cp.smile.entity.study_management.StudyMeeting;
import cp.smile.entity.study_management.StudyMeetingType;
import cp.smile.entity.study_management.StudyMeetingTypeName;
import cp.smile.entity.user.User;
import cp.smile.study_common.repository.StudyCommonRepository;
import cp.smile.study_management.meeting.dto.request.AttendRequestDTO;
import cp.smile.study_management.meeting.dto.request.MeetingCreationRequestDTO;
import cp.smile.study_management.meeting.dto.response.AttendTokenDTO;
import cp.smile.study_management.meeting.dto.response.MeetingDTO;
import cp.smile.study_management.meeting.dto.response.MeetingTypeDTO;
import cp.smile.study_management.meeting.service.OpenViduService;
import cp.smile.study_management.meeting.service.StudyMeetingService;
import cp.smile.user.repository.UserJoinStudyRepository;
import cp.smile.user.repository.UserRepository;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static cp.smile.config.response.CustomSuccessStatus.RESPONSE_NO_CONTENT;
import static cp.smile.config.response.CustomSuccessStatus.RESPONSE_SUCCESS;
import static cp.smile.config.response.exception.CustomExceptionStatus.ACCOUNT_NOT_FOUND;
import static cp.smile.config.response.exception.CustomExceptionStatus.NOT_FOUND_STUDY;

@Slf4j
@Tag(name = "????????? ???????????? API", description = "????????? ???????????? ?????? API ??????")
@RestController
@RequiredArgsConstructor
public class MeetingController {

    private final ResponseService responseService;
    private final UserRepository userRepository;
    private final StudyCommonRepository studyCommonRepository;
    private final UserJoinStudyRepository userJoinStudyRepository;
    private final StudyMeetingService studyMeetingService;
    private final OpenViduService openViduService;

    @Tag(name="????????? ???????????? API")
    @Operation(summary = "????????? ???????????? ?????? ??????", description =  "?????? ?????? ???????????????, ?????? ????????????????????? ????????????.")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API ?????? ??????"),
            @ApiResponse(responseCode = "400",description = "API ??????")
    })
    @GetMapping("/studies/{studyId}/meetings")
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

    @Tag(name="????????? ???????????? API")
    @Operation(summary = "?????? ???????????? ?????? ??????", description =  "???????????? ???????????? ????????? ???????????? ????????? ???????????? - ??????, ??????, ?????????")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API ?????? ??????"),
            @ApiResponse(responseCode = "400",description = "API ??????")
    })
    @GetMapping("/studies/{studyId}/meetings/{meetingId}")
    public DataResponse<MeetingDTO> getById(
            @AuthenticationPrincipal CustomOAuth2User oAuth2User,
            @PathVariable int studyId,
            @PathVariable int meetingId
    ) {
        checkIsJoinedStudy(oAuth2User.getUserId(), studyId);
        StudyMeeting meeting = studyMeetingService.findById(meetingId);
        return responseService.getDataResponse(new MeetingDTO(String.valueOf(studyId), meeting), RESPONSE_SUCCESS);
    }

    @Tag(name="????????? ???????????? API")
    @Operation(summary = "???????????? ??????", description =  "??????????????? ????????????, ????????? ???????????? ????????? ???????????? - ????????? ???")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API ?????? ??????"),
            @ApiResponse(responseCode = "400",description = "API ??????")
    })
    @PostMapping("/studies/{studyId}/meetings")
    public DataResponse<MeetingDTO> createMeeting(@AuthenticationPrincipal CustomOAuth2User oAuth2User,
                                         @RequestBody MeetingCreationRequestDTO dto,
                                         @PathVariable int studyId) throws OpenViduJavaClientException, OpenViduHttpException {
        checkIsJoinedStudy(oAuth2User.getUserId(), studyId);

        StudyMeeting meeting = createMeeting(oAuth2User.getUserId(), studyId, dto);

        return responseService.getDataResponse(new MeetingDTO(String.valueOf(studyId), meeting), RESPONSE_SUCCESS);
    }

    @Tag(name="????????? ???????????? API")
    @Operation(summary = "???????????? ??????", description =  "???????????? ???????????? ???????????? ???????????? ?????? ????????? ????????? ????????????.")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API ?????? ??????"),
            @ApiResponse(responseCode = "400",description = "API ??????")
    })
    @PostMapping("/studies/{studyId}/meetings/connection")
    public DataResponse<AttendTokenDTO> createConnection(
            @AuthenticationPrincipal CustomOAuth2User oAuth2User,
            @PathVariable int studyId,
            @RequestBody(required = false) AttendRequestDTO dto)
            throws OpenViduJavaClientException, OpenViduHttpException {
        log.info("attendRequest dto: {}");
        
        checkIsJoinedStudy(oAuth2User.getUserId(), studyId);

        String sessionId = String.valueOf(studyId);
        if (!openViduService.existsSession(sessionId)) {
            createMeeting(oAuth2User.getUserId(), studyId, null);
        }

        String connection = openViduService.createConnectionToken(sessionId, dto);

        return responseService.getDataResponse(new AttendTokenDTO(sessionId, connection), RESPONSE_SUCCESS);
    }

    @Tag(name="????????? ???????????? API")
    @Operation(summary = "???????????? ??????", description =  "????????? ??????????????? ????????????, ???????????? ????????? - ???????????? ??????")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API ?????? ??????"),
            @ApiResponse(responseCode = "400",description = "API ??????")
    })
    @DeleteMapping("/studies/{studyId}/meetings")
    public CommonResponse closeMeeting(@PathVariable int studyId) throws OpenViduJavaClientException, OpenViduHttpException {
        openViduService.closeSession(String.valueOf(studyId));
        studyMeetingService.closeMeeting(studyId);
        return responseService.getSuccessResponse();
    }

    @Tag(name="????????? ???????????? API")
    @Operation(summary = "???????????? ?????? ??????", description =  "???????????? ?????? ????????? ????????? ??????")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API ?????? ??????"),
            @ApiResponse(responseCode = "400",description = "API ??????")
    })
    @GetMapping("/studies/meetings/types")
    public DataResponse<Map<String, Object>> getTypes() {
        List<StudyMeetingType> types = studyMeetingService.findAllType();
        List<MeetingTypeDTO> list = types.stream().map(MeetingTypeDTO::of).collect(Collectors.toList());

        Map<String, Object> data = new HashMap<>();
        data.put("types", list);

        return responseService.getDataResponse(data, types.isEmpty() ? RESPONSE_NO_CONTENT : RESPONSE_SUCCESS);
    }

    private StudyMeeting createMeeting(int starterId, int studyId, MeetingCreationRequestDTO dto)
            throws OpenViduJavaClientException, OpenViduHttpException {
        User starter = userRepository.findById(starterId)
                .orElseThrow(() -> new CustomException(ACCOUNT_NOT_FOUND));

        StudyInformation study = studyCommonRepository.findById(studyId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_STUDY));

        if (dto == null) {
            dto = MeetingCreationRequestDTO.builder()
                    .meetingName(study.getName() + "??? ????????????")
                    .meetingTypeId(StudyMeetingTypeName.valueOf("??????").getId())
                    .build();
        }

        String sessionId = openViduService.createSession(String.valueOf(studyId));
        return studyMeetingService.createMeeting(starter, study, dto);
    }

    private boolean checkIsJoinedStudy(int userId, int studyId) {
        return userJoinStudyRepository.findByUserIdAndStudyId(userId, studyId).isPresent();
    }
}
