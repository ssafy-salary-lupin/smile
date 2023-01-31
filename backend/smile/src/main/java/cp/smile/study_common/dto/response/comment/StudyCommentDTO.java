package cp.smile.study_common.dto.response.comment;

import cp.smile.study_common.dto.response.StudyUserProfileDTO;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class StudyCommentDTO {

    private StudyUserProfileDTO user;
    private String content;

    private List<StudyReplyDTO> replies;

    @Builder
    public StudyCommentDTO(StudyUserProfileDTO user, String content, List<StudyReplyDTO> replies) {
        this.user = user;
        this.content = content;
        this.replies = replies;
    }
}
