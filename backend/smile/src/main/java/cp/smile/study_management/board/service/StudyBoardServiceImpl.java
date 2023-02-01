package cp.smile.study_management.board.service;

import cp.smile.entity.study_common.StudyInformation;
import cp.smile.entity.study_management.StudyBoard;
import cp.smile.entity.study_management.StudyBoardType;
import cp.smile.entity.user.User;
import cp.smile.study_management.board.dto.request.StudyBoardWriteDTO;
import cp.smile.study_management.board.repository.StudyBoardRepository;
import cp.smile.study_management.board.repository.StudyBoardTypeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StudyBoardServiceImpl implements StudyBoardService {

    private final StudyBoardRepository studyBoardRepository;
    private final StudyBoardTypeRepository studyBoardTypeRepository;

    @Override
    @Transactional
    public StudyBoard write(User writer, StudyInformation study, StudyBoardWriteDTO dto) {
        StudyBoardType boardType = studyBoardTypeRepository.findById(dto.getTypeId())
                .orElseThrow(() -> new EntityNotFoundException(dto.getTypeId() + "에 해당하는 게시글 유형이 없습니다."));

        StudyBoard studyBoard = StudyBoard.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .studyBoardType(boardType)
                .build();

        studyBoard.setWriter(writer);
        studyBoard.setStudyInformation(study);

        return studyBoardRepository.save(studyBoard);
    }
}
