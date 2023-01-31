package cp.smile.user.service;

import cp.smile.entity.user.User;
import cp.smile.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    @Override
    public User join(User user) {
        return userRepository.save(user);
    }

    @Override
    public User findOne(int id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public List<User> findUsers() {
        return userRepository.findAll();
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
}
