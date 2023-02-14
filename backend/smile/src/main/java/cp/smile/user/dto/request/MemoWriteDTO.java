package cp.smile.user.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemoWriteDTO {

    private String content;
    private int posX;
    private int posY;
}
