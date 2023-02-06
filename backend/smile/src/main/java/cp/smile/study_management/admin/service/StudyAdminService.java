package cp.smile.study_management.admin.service;

import cp.smile.entity.user.User;
import cp.smile.entity.user.UserJoinStudy;

import java.util.List;

public interface StudyAdminService {

    List<User> findUserByStudy(int studyId);

    void changeLeader(int currentLeaderId, int studyId, int nextLeaderId);

    void closeStudy(int studyLeaderId, int studyId);

    void recruitStudy(int studyLeaderId, int studyId);

    void deadlineStudy(int studyLeaderId, int studyId);

    void banUser(int studyLeaderId, int studyId, int userId);
}
