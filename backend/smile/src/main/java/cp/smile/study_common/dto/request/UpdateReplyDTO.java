package cp.smile.study_common.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
public class UpdateReplyDTO {

    private String content;

    @Builder
    public UpdateReplyDTO(String content) {
        this.content = content;
    }
}
