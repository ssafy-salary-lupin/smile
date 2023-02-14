package cp.smile.user.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
public class MemoWriteDTO {

    private String content;
    private Pos pos;

    @Getter
    @NoArgsConstructor
    public static class Pos {

        private Integer y;
        private Integer x;

        public Pos(Integer y, Integer x) {
            this.y = y;
            this.x = x;
        }
    }
}
