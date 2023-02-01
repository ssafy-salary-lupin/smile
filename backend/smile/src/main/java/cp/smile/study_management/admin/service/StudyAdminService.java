package cp.smile.study_management.admin.service;

import cp.smile.entity.user.UserJoinStudy;
import cp.smile.study_management.admin.dto.response.FindStudyUserDTO;

import java.util.List;

public interface StudyAdminService {

    List<FindStudyUserDTO> findAllUser(int studyId);
}
