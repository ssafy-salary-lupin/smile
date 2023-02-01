package cp.smile.study_management.admin.service;

import cp.smile.entity.user.User;
import cp.smile.entity.user.UserJoinStudy;
import cp.smile.study_management.admin.dto.response.FindStudyUserDTO;
import cp.smile.study_management.admin.repository.StudyAdminRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = false)
@Slf4j
@RequiredArgsConstructor
public class StudyAdminServiceImpl implements StudyAdminService{

    private final StudyAdminRepository studyAdminRepository;

    @Override
    public List<FindStudyUserDTO> findAllUser(int studyId) {

        

        return null;
//        return studyAdminRepository.findByAllUser(studyId);
    }
}
