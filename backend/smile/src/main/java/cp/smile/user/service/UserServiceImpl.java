package cp.smile.user.service;

import cp.smile.entity.user.LoginProvider;
import cp.smile.entity.user.User;
import cp.smile.user.dto.request.UserJoinDTO;
import cp.smile.user.dto.response.UserInfoDTO;
import cp.smile.user.repository.LoginProviderRepository;
import cp.smile.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final LoginProviderRepository loginProviderRepository;

    @Override
    public void join(UserJoinDTO userJoinDTO) {

        // TODO: 2023-01-31 비밀번호 암호화해서 DB에 넣기, loginProvider, 프로필이미지 경로 처리

        LoginProvider loginProvider = loginProviderRepository
                .findById(1)
                .orElseThrow(RuntimeException::new);

        User user = User.builder()
                .email(userJoinDTO.getEmail())
                .nickname(userJoinDTO.getNickname())
                .password(userJoinDTO.getPassword())
                .imagePath("123")
                .isDeleted(false)
                .refreshToken("123")
                .loginProvider(loginProvider).build();

        userRepository.save(user);
    }

    @Override
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

}
