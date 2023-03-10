package cp.smile.user.service;

import cp.smile.entity.user.User;
import cp.smile.entity.user.UserJoinStudy;
import cp.smile.user.dto.request.UserJoinDTO;
import cp.smile.user.dto.request.UserUpdateDTO;
import cp.smile.user.dto.response.UserInfoDTO;
import cp.smile.user.dto.response.UserTokenDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {

    User join(User user); //회원가입
    void join(UserJoinDTO userJoinDTO);

    User findOne(int id);

    UserInfoDTO findDetailUser(int id);

    User findByEmail(String email);

    void updateRefreshToken(User user, String refreshToken);
    void updateProfileImage(User user, String newImagePath);

    void joinStudy(int userId, int studyId);

    List<UserJoinStudy> findJoinStudies(int userId);

    UserTokenDTO login(String email, String password);

    void logout(int userId);

    void updateUserInfo(int userId, UserUpdateDTO userUpdateDTO, MultipartFile multipartFile);

    void deleteUser(int userId);

    void leaveStudy(int userId, int studyId);
}
