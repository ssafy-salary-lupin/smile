package cp.smile.study_management.admin.service;

import cp.smile.entity.user.User;

import java.util.List;

public interface StudyAdminService {

    List<User> findUserByStudy(int studyId);
}
