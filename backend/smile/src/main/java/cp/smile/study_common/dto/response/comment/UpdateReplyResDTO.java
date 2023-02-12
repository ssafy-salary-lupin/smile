package cp.smile.study_common.dto.response.comment;

import lombok.Builder;
import lombok.Getter;

@Getter
public class UpdateReplyResDTO {

    private String content;

    @Builder
    public UpdateReplyResDTO(String content) {
        this.content = content;
    }
}
