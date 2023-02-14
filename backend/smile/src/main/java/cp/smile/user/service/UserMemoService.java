package cp.smile.user.service;

import cp.smile.entity.user.User;
import cp.smile.entity.user.UserMemo;
import cp.smile.user.dto.request.MemoWriteDTO;

import java.util.List;

public interface UserMemoService {

    List<UserMemo> findByUserId(int userId);
    UserMemo write(User writer, MemoWriteDTO dto);
}
