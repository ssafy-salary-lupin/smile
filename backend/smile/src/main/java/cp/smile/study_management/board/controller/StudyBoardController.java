package cp.smile.study_management.board.controller;

import cp.smile.auth.oauth2.CustomOAuth2User;
import cp.smile.config.response.CommonResponse;
import cp.smile.config.response.DataResponse;
import cp.smile.config.response.ResponseService;
import cp.smile.dto.response.PageDTO;
import cp.smile.entity.study_management.StudyBoard;
import cp.smile.entity.user.UserJoinStudy;
import cp.smile.study_management.board.dto.request.StudyBoardWriteDTO;
import cp.smile.study_management.board.dto.response.SimpleBoardDTO;
import cp.smile.study_management.board.service.StudyBoardService;
import cp.smile.user.repository.UserJoinStudyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/studies/{studyId}/boards")
@Slf4j
@RequiredArgsConstructor
public class StudyBoardController {

    private final StudyBoardService studyBoardService;
    private final ResponseService responseService;
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
    public DataResponse<PageDTO<SimpleBoardDTO>> getAllStudyBoard(
            @AuthenticationPrincipal CustomOAuth2User customOAuth2User,
            @PathVariable int studyId,
            @RequestParam(value = "page", required = false) Integer page,
            @RequestParam(value = "size", required = false) Integer size) {
        // 가입한 스터디의 게시글만 볼 수 있도록 검사
        userJoinStudyRepository.findByUserIdAndStudyId(customOAuth2User.getUserId(), studyId)
                .orElseThrow(() -> new RuntimeException("가입한 스터디의 게시글만 볼 수 있습니다."));

        if (page == null) page = 1;
        if (size == null) size = 10;
        page--;

        if (page < 1 && size < 1) {
            throw new IllegalArgumentException();
        }

        Page<StudyBoard> result = studyBoardService.findByStudyIdWithPaging(studyId, PageRequest.of(page, size));
        List<SimpleBoardDTO> content = result.getContent().stream()
                .map(SimpleBoardDTO::of)
                .collect(Collectors.toList());

        return responseService.getDataResponse(PageDTO.of(result, content));
    }
}
