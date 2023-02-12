package cp.smile.study_common.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
public class UpdateCommentDTO {

    private String content;

    @Builder
    public UpdateCommentDTO(String content) {
        this.content = content;
    }
}
