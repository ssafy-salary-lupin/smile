package cp.smile.user.service;

import cp.smile.entity.user.User;

import java.util.List;

public interface UserService {

    User join(User user); //회원가입

    User findOne(int id);

    List<User> findUsers();

    User findByEmail(String email);

    void updateRefreshToken(User user, String refreshToken);
}
