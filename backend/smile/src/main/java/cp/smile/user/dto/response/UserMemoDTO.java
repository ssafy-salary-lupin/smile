package cp.smile.user.dto.response;

import cp.smile.entity.user.UserMemo;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class UserMemoDTO {

    private int id;
    private String content;
    private int posX;
    private int posY;
    private LocalDateTime creatTime;
    private LocalDateTime updateTime;

    @Builder
    public UserMemoDTO(int id, String content, int posX, int posY, LocalDateTime creatTime, LocalDateTime updateTime) {
        this.id = id;
        this.content = content;
        this.posX = posX;
        this.posY = posY;
        this.creatTime = creatTime;
        this.updateTime = updateTime;
    }

    public static UserMemoDTO of(UserMemo memo) {
        return UserMemoDTO.builder()
                .id(memo.getId())
                .content(memo.getContent())
                .posX(memo.getPosX())
                .posY(memo.getPosY())
                .creatTime(memo.getCreateTime())
                .updateTime(memo.getUpdateTime())
                .build();
    }
}
