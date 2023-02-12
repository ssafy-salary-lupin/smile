package cp.smile.study_common.service;


import cp.smile.entity.study_common.StudyInformation;
import cp.smile.study_common.dto.FindFilter;
import cp.smile.study_common.dto.request.CreateCommentDTO;
import cp.smile.study_common.dto.request.CreateReplyDTO;
import cp.smile.study_common.dto.request.CreateStudyDTO;
import cp.smile.study_common.dto.response.CreateStudyResponseDTO;
import cp.smile.study_common.dto.response.FindAllStudyDTO;
import cp.smile.study_common.dto.response.FindDetailStudyDTO;
import cp.smile.study_common.dto.response.StudyTypeDTO;
import cp.smile.study_common.repository.StudyCommonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface StudyCommonService {


    List<FindAllStudyDTO> findAllStudy(FindFilter findFilter);
    CreateStudyResponseDTO createStudy(int userId, CreateStudyDTO createStudyDTO, MultipartFile multipartFile); //스터디 생성


    FindDetailStudyDTO findDetailStudy(int id); //상세조회

    void createComment(CreateCommentDTO createCommentDTO);
    void createReply(CreateReplyDTO createReplyDTO);

    List<StudyTypeDTO> findAllType();
}
