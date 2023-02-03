package cp.smile.study_common.dto.request;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateReplyDTO {

    private int userId;
    private int commentId; //댓글 식별자

    private String content; //대댓글 내용.


}
