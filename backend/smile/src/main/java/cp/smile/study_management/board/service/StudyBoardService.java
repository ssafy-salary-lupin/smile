package cp.smile.study_management.board.service;

import cp.smile.entity.study_management.StudyBoard;
import cp.smile.study_management.board.dto.request.StudyBoardWriteDTO;

public interface StudyBoardService {

    public StudyBoard write(int userId, int studyId, StudyBoardWriteDTO dto);
}
