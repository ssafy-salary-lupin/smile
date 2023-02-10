package cp.smile.user.service;

import com.sun.xml.bind.v2.TODO;
import cp.smile.auth.jwt.JwtProvider;
import cp.smile.auth.oauth2.provider.LoginProviderRepository;
import cp.smile.auth.oauth2.provider.OAuth2Provider;
import cp.smile.config.response.exception.CustomException;
import cp.smile.entity.study_common.StudyInformation;
import cp.smile.entity.user.LoginProvider;
import cp.smile.entity.user.User;
import cp.smile.entity.user.UserJoinStudy;
import cp.smile.entity.user.UserJoinStudyId;
import cp.smile.study_common.repository.StudyCommonRepository;
import cp.smile.user.dto.request.UserJoinDTO;
import cp.smile.user.dto.request.UserUpdateDTO;
import cp.smile.user.dto.response.UserInfoDTO;
import cp.smile.user.dto.response.UserTokenDTO;
import cp.smile.user.repository.UserJoinStudyRepository;
import cp.smile.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.authentication.BadCredentialsException;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;

import static cp.smile.config.AwsS3DirectoryName.DEFAULT_PROFILE;
import static cp.smile.config.response.exception.CustomExceptionStatus.*;

@Service
@Transactional(readOnly = false)
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final StudyCommonRepository studyCommonRepository;
    private final LoginProviderRepository loginProviderRepository;
    private final UserJoinStudyRepository userJoinStudyRepository;
    private final JwtProvider jwtProvider;

    @Override
    public User join(User user) {
        return userRepository.save(user);
    }

    public void join(UserJoinDTO userJoinDTO) {

        LoginProvider loginProvider = loginProviderRepository
                .findByProvider(OAuth2Provider.local)
                .orElseThrow(() -> new CustomException(NOT_FOUND_LOGIN_PROVIDER));

        userJoinDTO.setPassword(passwordEncoder.encode(userJoinDTO.getPassword()));

        User user = User.builder()
                .email(userJoinDTO.getEmail())
                .nickname(userJoinDTO.getNickname())
                .password(userJoinDTO.getPassword())
                .imagePath(DEFAULT_PROFILE)
                .isDeleted(false)
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
                .imagePath(user.getImagePath())
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
                .orElseThrow(() -> new CustomException(ACCOUNT_NOT_FOUND));

        log.info("find user: {}", user.getEmail());

        StudyInformation study = studyCommonRepository.findById(studyId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_STUDY));

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
        study.addPerson();
    }

    @Override
    public List<UserJoinStudy> findJoinStudies(int userId) {
        return userJoinStudyRepository.findByUserId(userId);
    }

    @Override
    public UserTokenDTO login(String email, String password) {
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new EntityNotFoundException(email + "에 해당하는 유저가 없습니다."));

            if (!passwordEncoder.matches(password, user.getPassword())) {
                throw new BadCredentialsException("비밀번호가 일치하지 않습니다.");
            }

            String accessToken = jwtProvider.createAccessToken(user.getId(), email);
            String refreshToken = jwtProvider.createRefreshToken(null);

            user.updateRefreshToken(refreshToken);

            return UserTokenDTO.builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshToken).build();
    }

    @Override
    public void logout(int userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException(userId + "에 해당하는 유저가 없습니다."));

        user.updateRefreshToken(null);
    }

    @Override
    public void updateUserInfo(int userId, UserUpdateDTO userUpdateDTO) {

        // TODO 이미지 경로 처리

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ACCOUNT_NOT_FOUND));

        if (userUpdateDTO.getNickname() != null) {
            user.updateNickname(userUpdateDTO.getNickname());
        }

        if (userUpdateDTO.getPassword() != null) {
            userUpdateDTO.setPassword(passwordEncoder.encode(userUpdateDTO.getPassword()));

            user.updatePassword(userUpdateDTO.getPassword());
        }

        if (userUpdateDTO.getImagePath() != null) {
            user.updateImagePath(userUpdateDTO.getImagePath());
        }
    }

    @Override
    public void deleteUser(int userId) {

        // TODO 탈퇴는 isDelete만 true로 바꿔주면 끝???

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ACCOUNT_NOT_FOUND));

        if (user.getIsDeleted() == false) {
            user.deleteUser();
        }
    }


}
