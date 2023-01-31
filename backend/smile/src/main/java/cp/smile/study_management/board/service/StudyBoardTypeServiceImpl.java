package cp.smile.study_management.board.service;

import cp.smile.entity.study_management.StudyBoardType;
import cp.smile.study_management.board.repository.StudyBoardTypeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StudyBoardTypeServiceImpl implements StudyBoardTypeService {

    private final StudyBoardTypeRepository studyBoardTypeRepository;

    @Override
    public StudyBoardType findById(int id) {
        return studyBoardTypeRepository.findById(id).orElse(null);
    }
}
