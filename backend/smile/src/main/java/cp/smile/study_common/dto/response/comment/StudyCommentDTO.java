package cp.smile.study_common.dto.response.comment;

import cp.smile.study_common.dto.response.UserProfileDTO;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class StudyCommentDTO {

    private int id; //식별자
    private UserProfileDTO user;
    private String content;

    private List<StudyReplyDTO> replies;

    @Builder
    public StudyCommentDTO(int id, UserProfileDTO user, String content, List<StudyReplyDTO> replies) {
        this.id = id;
        this.user = user;
        this.content = content;
        this.replies = replies;
    }


}
