package cp.smile.study_management.board.service;

import cp.smile.entity.study_management.StudyBoard;
import cp.smile.study_management.board.dto.request.StudyBoardWriteDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StudyBoardServiceImpl implements StudyBoardService {

//    private final StudyBoardRepository studyBoardRepository;
//    private final UserService userService;
//    private final StudyCommonService studyCommonService;
//    private final StudyBoardTypeService studyBoardTypeService;

    @Override
    public StudyBoard write(int userId, int studyId, StudyBoardWriteDTO dto) {
//        User user = userService.findOne(userId);
//        StudyInformation study = studyCommonService.findById(studyId);
//        StudyBoardType type = studyBoardTypeService.findById(dto.getTypeId());
//
//        StudyBoard studyBoard = StudyBoard.builder()
//                .studyBoardType(type)
//                .user(user)
//                .title(dto.getTitle())
//                .content(dto.getContent())
//                .build();
//
//        studyBoard.setStudyInformation(study);
//
//        return studyBoardRepository.save(studyBoard);
        return null;
    }
}
