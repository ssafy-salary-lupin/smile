package cp.smile.study_management.board.service;

import cp.smile.entity.study_management.StudyBoard;
import cp.smile.entity.user.UserJoinStudy;
import cp.smile.study_management.board.dto.request.StudyBoardWriteDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface StudyBoardService {

    StudyBoard write(UserJoinStudy userJoinStudy, StudyBoardWriteDTO dto, MultipartFile[] files);
    List<StudyBoard> findByStudyId(int studyId);
}
