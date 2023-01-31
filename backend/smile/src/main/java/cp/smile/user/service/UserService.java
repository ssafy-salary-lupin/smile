package cp.smile.user.service;

import cp.smile.entity.user.User;
import cp.smile.user.dto.request.UserJoinDTO;
import cp.smile.user.dto.response.UserInfoDTO;

import java.util.List;

public interface UserService {

    User join(User user); //회원가입
    void join(UserJoinDTO userJoinDTO);

    UserInfoDTO findDetailUser(int id);

    User findByEmail(String email);

    void updateRefreshToken(User user, String refreshToken);
}
