package cp.smile.user.service;

import cp.smile.entity.user.User;
import cp.smile.entity.user.UserMemo;
import cp.smile.user.dto.request.MemoWriteDTO;
import cp.smile.user.repository.UserMemoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserMemoServiceImpl implements UserMemoService {

    private final UserMemoRepository userMemoRepository;

    @Override
    public List<UserMemo> findByUserId(int userId) {
        return userMemoRepository.findByUserIdAndDeletedIsFalse(userId);
    }

    @Override
    public UserMemo write(User writer, MemoWriteDTO dto) {
        UserMemo memo = UserMemo.builder()
                .user(writer)
                .content(dto.getContent())
                .posX(dto.getPosX())
                .posY(dto.getPosY())
                .build();

        return userMemoRepository.save(memo);
    }
}
