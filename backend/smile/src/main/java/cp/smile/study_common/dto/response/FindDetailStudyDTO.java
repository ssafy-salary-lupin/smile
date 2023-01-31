package cp.smile.study_common.dto.response;


import cp.smile.study_common.dto.response.comment.StudyCommentDTO;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

/*스터디 상세정보 조회시 사용*/
@Getter
public class FindDetailStudyDTO {

    private String name; // 스터디 이름
    private LocalDate startDate;
    private LocalDate endDate;
    private String time;
    private String imgPath;
    private int currentPerson;
    private int maxPerson;
    private int viewCount;

    private StudyTypeDTO type; //스터디 타입
    private List<StudyCommentDTO> comments; //댓글 정보




}
