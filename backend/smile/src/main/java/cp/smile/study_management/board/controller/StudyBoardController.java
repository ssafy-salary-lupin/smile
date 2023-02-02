package cp.smile.study_management.board.controller;

import cp.smile.auth.oauth2.CustomOAuth2User;
import cp.smile.config.response.CommonResponse;
import cp.smile.config.response.DataResponse;
import cp.smile.config.response.ResponseService;
import cp.smile.entity.study_management.StudyBoard;
import cp.smile.entity.user.UserJoinStudy;
import cp.smile.study_common.repository.StudyCommonRepository;
import cp.smile.study_management.board.dto.request.StudyBoardWriteDTO;
import cp.smile.study_management.board.dto.response.StudyBoardListDTO;
import cp.smile.study_management.board.service.StudyBoardService;
import cp.smile.user.repository.UserJoinStudyRepository;
import cp.smile.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@RestController
@RequestMapping("/studies/{studyId}/boards")
@Slf4j
@RequiredArgsConstructor
public class StudyBoardController {

    private final StudyBoardService studyBoardService;
    private final ResponseService responseService;
    private final UserRepository userRepository;
    private final StudyCommonRepository studyCommonRepository;
    private final UserJoinStudyRepository userJoinStudyRepository;

    @PostMapping
    public CommonResponse write(@AuthenticationPrincipal CustomOAuth2User oAuth2User,
                                @PathVariable int studyId,
                                @RequestPart("data") StudyBoardWriteDTO dto,
                                @RequestPart("files") MultipartFile[] files) {
        UserJoinStudy userJoinStudy = userJoinStudyRepository.findByUserIdAndStudyId(oAuth2User.getUserId(), studyId)
                .orElseThrow(() -> new EntityNotFoundException("잘못된 접근입니다."));

        studyBoardService.write(userJoinStudy, dto, files);
        log.info("스터디 게시글 작성 - 작성자: {} / 스터디: {}",
                userJoinStudy.getUser(), userJoinStudy.getStudyInformation());

        return responseService.getSuccessResponse();
    }

    @GetMapping
    public DataResponse<StudyBoardListDTO> getAllStudyBoard(@PathVariable int studyId) {
        List<StudyBoard> studyBoards = studyBoardService.findByStudyId(studyId);

        return responseService.getDataResponse(StudyBoardListDTO.of(studyBoards));
    }
}
