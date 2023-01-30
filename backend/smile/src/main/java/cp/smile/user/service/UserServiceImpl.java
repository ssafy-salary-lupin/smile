package cp.smile.user.service;

import cp.smile.entity.user.LoginProvider;
import cp.smile.entity.user.User;
import cp.smile.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    @Override
    public void join(User user) {

        userRepository.save(user);
    }

    @Override
    public User findOne(int id) {
        System.out.println("123123");
        return userRepository.findById(id);
    }

    @Override
    public List<User> findUsers() {
        return userRepository.findAll();
    }

}
