package cp.smile.study_management.board.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class StudyBoardUpdateDTO {

    private String title;
    private String content;
    private Integer typeId;
    private List<Integer> deleteFileId;

}
