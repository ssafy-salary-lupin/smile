package cp.smile.user.repository;

import cp.smile.entity.user.LoginProvider;
import cp.smile.entity.user.User;

import java.util.List;


public interface UserRepository {

    void save(User user);

    User findById(int id);

    List<User> findAll();

    //테스트를 위해서 만듦
    LoginProvider findByLoginProviderId(int id);

}
