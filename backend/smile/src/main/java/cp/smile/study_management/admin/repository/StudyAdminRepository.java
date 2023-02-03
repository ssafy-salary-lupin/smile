package cp.smile.study_management.admin.repository;

import cp.smile.entity.user.User;
import cp.smile.entity.user.UserJoinStudy;
import cp.smile.entity.user.UserJoinStudyId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StudyAdminRepository extends JpaRepository<UserJoinStudy, UserJoinStudyId> {

}
