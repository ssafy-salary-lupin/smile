package cp.smile.user.dto.response;

import cp.smile.entity.user.UserMemo;
import cp.smile.user.dto.request.MemoWriteDTO;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class UserMemoDTO {

    private int id;
    private String content;
    private MemoWriteDTO.Pos pos;
    private LocalDateTime creatTime;
    private LocalDateTime updateTime;

    @Builder
    public UserMemoDTO(int id, String content, MemoWriteDTO.Pos pos, LocalDateTime creatTime, LocalDateTime updateTime) {
        this.id = id;
        this.content = content;
        this.pos = pos;
        this.creatTime = creatTime;
        this.updateTime = updateTime;
    }

    public static UserMemoDTO of(UserMemo memo) {
        return UserMemoDTO.builder()
                .id(memo.getId())
                .content(memo.getContent())
                .pos(new MemoWriteDTO.Pos(memo.getPosY(), memo.getPosX()))
                .creatTime(memo.getCreateTime())
                .updateTime(memo.getUpdateTime())
                .build();
    }
}
