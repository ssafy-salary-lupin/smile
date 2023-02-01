package cp.smile.user.service;

import cp.smile.entity.user.User;
import cp.smile.entity.user.UserJoinStudy;
import cp.smile.user.dto.request.UserJoinDTO;
import cp.smile.user.dto.response.UserInfoDTO;

import java.util.List;

public interface UserService {

    User join(User user); //회원가입
    void join(UserJoinDTO userJoinDTO);

    User findOne(int id);

    UserInfoDTO findDetailUser(int id);

    User findByEmail(String email);

    void updateRefreshToken(User user, String refreshToken);

    void joinStudy(int userId, int studyId);

    List<UserJoinStudy> findJoinStudies(int userId);
}
