package cp.smile.study_management.board.service;

import cp.smile.entity.study_management.StudyBoard;
import cp.smile.entity.study_management.StudyBoardComment;
import cp.smile.entity.study_management.StudyBoardType;
import cp.smile.entity.user.User;
import cp.smile.entity.user.UserJoinStudy;
import cp.smile.study_management.board.dto.request.StudyBoardWriteDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface StudyBoardService {

    StudyBoard write(UserJoinStudy userJoinStudy, StudyBoardWriteDTO dto, MultipartFile[] files);
    StudyBoard findById(int boardId);
    StudyBoard findByIdForView(int boardId);
    Page<StudyBoard> findByStudyIdWithPaging(int studyId, int type,Pageable pageable);
    StudyBoardComment writeComment(User writer, int boardId, String content);
    List<StudyBoardType> findAllType();

    void deleteStudyBoard(int userId, int studyId,int boardId);
}
