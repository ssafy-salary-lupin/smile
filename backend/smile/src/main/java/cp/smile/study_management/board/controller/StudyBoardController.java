package cp.smile.study_management.board.controller;

import cp.smile.auth.oauth2.CustomOAuth2User;
import cp.smile.config.response.CommonResponse;
import cp.smile.config.response.DataResponse;
import cp.smile.config.response.ResponseService;
import cp.smile.entity.study_common.StudyInformation;
import cp.smile.entity.study_management.StudyBoard;
import cp.smile.entity.user.User;
import cp.smile.study_common.repository.StudyCommonRepository;
import cp.smile.study_common.service.StudyCommonService;
import cp.smile.study_management.board.dto.request.StudyBoardWriteDTO;
import cp.smile.study_management.board.dto.response.StudyBoardListDTO;
import cp.smile.study_management.board.service.StudyBoardService;
import cp.smile.user.repository.UserRepository;
import cp.smile.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    public CommonResponse write(@AuthenticationPrincipal CustomOAuth2User oAuth2User,
                                @PathVariable int studyId,
                                @RequestBody StudyBoardWriteDTO dto) {
        User writer = userRepository.findById(oAuth2User.getUserId())
                .orElseThrow(() -> new EntityNotFoundException(oAuth2User.getUserId() + "에 해당하는 사용자가 없습니다."));
        StudyInformation study = studyCommonRepository.findById(studyId)
                .orElseThrow(() -> new EntityNotFoundException(studyId + "에 해당하는 스터디가 없습니다"));

        studyBoardService.write(writer, study, dto);
        log.info("스터디 게시글 작성 - 작성자: {} / 스터디: {}", writer.getNickname(), study.getName());

        return responseService.getSuccessResponse();
    }

    @GetMapping
    public DataResponse<StudyBoardListDTO> getAllStudyBoard(@PathVariable int studyId) {
        List<StudyBoard> studyBoards = studyBoardService.findByStudyId(studyId);

        return responseService.getDataResponse(StudyBoardListDTO.of(studyBoards));
    }
}
