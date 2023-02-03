package cp.smile.study_management.admin.service;

import cp.smile.entity.user.User;
import cp.smile.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class StudyAdminServiceImpl implements StudyAdminService {

    private final UserRepository userRepository;

    @Override
    public List<User> findUserByStudy(int studyId) {
        return userRepository.findUserByStudy(studyId);
    }
}
