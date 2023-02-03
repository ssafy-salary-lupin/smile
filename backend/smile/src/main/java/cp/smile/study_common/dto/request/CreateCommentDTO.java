package cp.smile.study_common.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateCommentDTO {

    private int userId; //유저 식별자

    private int studyId;  //스터디 식별자
    private String content; // 댓글 내용


}
