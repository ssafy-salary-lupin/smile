package cp.smile.study_management.board.controller;

import cp.smile.config.response.CommonResponse;
import cp.smile.config.response.ResponseService;
import cp.smile.study_management.board.dto.request.StudyBoardWriteDTO;
import cp.smile.study_management.board.service.StudyBoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/studies/{studyId}/boards")
@Slf4j
@RequiredArgsConstructor
public class StudyBoardController {

    private final StudyBoardService studyBoardService;
    private final ResponseService responseService;

    @PostMapping
    public CommonResponse write(@PathVariable int studyId, @RequestBody StudyBoardWriteDTO dto) {
        int userId = 1;

        studyBoardService.write(userId, studyId, dto);
        return responseService.getSuccessResponse();
    }
}
