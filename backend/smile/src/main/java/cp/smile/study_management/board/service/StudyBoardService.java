package cp.smile.study_management.board.service;

import cp.smile.entity.study_common.StudyInformation;
import cp.smile.entity.study_management.StudyBoard;
import cp.smile.entity.user.User;
import cp.smile.study_management.board.dto.request.StudyBoardWriteDTO;

import java.util.List;

public interface StudyBoardService {

    StudyBoard write(User writer, StudyInformation stduy, StudyBoardWriteDTO dto);
    List<StudyBoard> findByStudyId(int studyId);
}
