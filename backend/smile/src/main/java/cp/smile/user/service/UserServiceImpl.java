package cp.smile.user.service;

import cp.smile.auth.oauth2.provider.LoginProviderRepository;
import cp.smile.auth.oauth2.provider.OAuth2Provider;
import cp.smile.entity.study_common.StudyInformation;
import cp.smile.entity.user.LoginProvider;
import cp.smile.entity.user.User;
import cp.smile.entity.user.UserJoinStudy;
import cp.smile.entity.user.UserJoinStudyId;
import cp.smile.study_common.repository.StudyCommonRepository;
import cp.smile.user.dto.request.UserJoinDTO;
import cp.smile.user.dto.response.UserInfoDTO;
import cp.smile.user.repository.UserJoinStudyRepository;
import cp.smile.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
@Transactional(readOnly = false)
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final StudyCommonRepository studyCommentRepository;
    private final LoginProviderRepository loginProviderRepository;
    private final UserJoinStudyRepository userJoinStudyRepository;

    @Override
    public User join(User user) {
        return userRepository.save(user);
    }

    public void join(UserJoinDTO userJoinDTO) {

        // TODO: 2023-01-31 프로필이미지 경로 처리, 중복 회원 처리

        LoginProvider loginProvider = loginProviderRepository
                .findByProvider(OAuth2Provider.local)
                .orElseThrow(RuntimeException::new);

        userJoinDTO.setPassword(passwordEncoder.encode(userJoinDTO.getPassword()));

        User user = User.builder()
                .email(userJoinDTO.getEmail())
                .nickname(userJoinDTO.getNickname())
                .password(userJoinDTO.getPassword())
                .imagePath("123")
                .isDeleted(false)
                .refreshToken("123")
                .loginProvider(loginProvider)
                .build();

        userRepository.save(user);
    }

    @Override
    public User findOne(int id) {
        return userRepository.findById(id).orElse(null);
    }

    public UserInfoDTO findDetailUser(int id) {

        User user = userRepository
                .findById(id)
                .orElseThrow(RuntimeException::new);

        return UserInfoDTO.builder()
                .id(user.getId())
                .nickname(user.getNickname())
                .email(user.getEmail())
                .imgPath(user.getImagePath())
                .isDeleted(user.getIsDeleted()).build();
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    @Override
    public void updateRefreshToken(User user, String refreshToken) {
        user = findOne(user.getId());
        user.updateRefreshToken(refreshToken);
    }

    @Override
    public void joinStudy(int userId, int studyId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException(userId + "에 해당하는 유저가 없습니다."));

        log.info("find user: {}", user.getEmail());

        StudyInformation study = studyCommentRepository.findById(studyId)
                .orElseThrow(() -> new EntityNotFoundException(studyId + "에 해당하는 스터디가 없습니다."));

        log.info("find study: {}", study.getName());

        /**
         * 이미 가입한 스터디인 경우 예외 처리 추가
         */

        UserJoinStudyId userJoinStudyId = new UserJoinStudyId(userId, studyId);
        UserJoinStudy userJoinStudy = UserJoinStudy.builder()
                .id(userJoinStudyId)
                .isBan(false)
                .isDeleted(false)
                .isLeader(false)
                .build();

        userJoinStudy.connectUserAndStudy(user, study);
        userJoinStudyRepository.save(userJoinStudy);
    }

    @Override
    public List<UserJoinStudy> findJoinStudies(int userId) {
        return userJoinStudyRepository.findByUserId(userId);
    }
}
