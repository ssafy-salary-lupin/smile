package cp.smile.user.service;

import cp.smile.config.response.exception.CustomException;
import cp.smile.entity.user.User;
import cp.smile.entity.user.UserMemo;
import cp.smile.user.dto.request.MemoWriteDTO;
import cp.smile.user.repository.UserMemoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;

import static cp.smile.config.response.exception.CustomExceptionStatus.NOT_EXISTS_MEMO;
import static cp.smile.config.response.exception.CustomExceptionStatus.NOT_WRITER;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserMemoServiceImpl implements UserMemoService {

    private final UserMemoRepository userMemoRepository;

    @Override
    public List<UserMemo> findByUserId(int userId) {
        return userMemoRepository.findByUserIdAndIsDeletedFalse(userId);
    }

    @Override
    @Transactional
    public UserMemo write(User writer, MemoWriteDTO dto) {
        UserMemo memo = UserMemo.builder()
                .user(writer)
                .content(dto.getContent())
                .posX(dto.getPos().getX())
                .posY(dto.getPos().getY())
                .build();

        return userMemoRepository.save(memo);
    }

    @Override
    @Transactional
    public UserMemo update(User writer, int memoId, MemoWriteDTO dto) {
        UserMemo memo = userMemoRepository.findByIdAndIsDeletedFalse(memoId)
                .orElseThrow(() -> new CustomException(NOT_EXISTS_MEMO));

        if (!memo.isWriter(writer)) {
            throw new CustomException(NOT_WRITER);
        }

        System.out.println(dto);

        if (StringUtils.hasText(dto.getContent())) {
            memo.updateContent(dto.getContent());
        }

        if (dto.getPos() != null) {
            MemoWriteDTO.Pos pos = dto.getPos();
            memo.updatePos(pos.getX(), pos.getY());
        }

        return memo;
    }

    @Override
    @Transactional
    public void delete(User writer, int memoId) {
        UserMemo memo = userMemoRepository.findByIdAndIsDeletedFalse(memoId)
                .orElseThrow(() -> new CustomException(NOT_EXISTS_MEMO));

        if (!memo.isWriter(writer)) {
            throw new CustomException(NOT_WRITER);
        }

        memo.delete();
    }
}
