package cp.smile.study_common.dto.response.comment;

import cp.smile.study_common.dto.response.UserProfileDTO;
import lombok.Builder;
import lombok.Getter;

@Getter
public class StudyReplyDTO {

    private int id; //식별자
    private UserProfileDTO user; //유저 프로필 객체
    private String content; //내용

    @Builder
    public StudyReplyDTO(int id, UserProfileDTO user, String content) {
        this.id = id;
        this.user = user;
        this.content = content;
    }
}
