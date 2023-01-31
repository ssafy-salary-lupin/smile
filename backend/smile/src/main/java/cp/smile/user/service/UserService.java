package cp.smile.user.service;

import cp.smile.entity.user.User;
import cp.smile.user.dto.request.UserJoinDTO;
import cp.smile.user.dto.response.UserInfoDTO;

import java.util.List;

public interface UserService {

    void join(UserJoinDTO userJoinDTO);

    UserInfoDTO findDetailUser(int id);

}
