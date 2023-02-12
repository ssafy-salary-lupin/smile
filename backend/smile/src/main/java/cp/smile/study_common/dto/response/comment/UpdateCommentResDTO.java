package cp.smile.study_common.dto.response.comment;

import lombok.Builder;
import lombok.Getter;

@Getter
public class UpdateCommentResDTO {

    private String content;

    @Builder
    public UpdateCommentResDTO(String content) {
        this.content = content;
    }
}
