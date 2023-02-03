package cp.smile.study_common.dto.response;


import cp.smile.study_common.dto.response.comment.StudyCommentDTO;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

/*스터디 상세정보 조회시 사용*/
@Getter
public class FindDetailStudyDTO {

    private int id; // 스터디 식별자
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


    @Builder
    public FindDetailStudyDTO(int id, String name, LocalDate startDate, LocalDate endDate, String time, String imgPath, int currentPerson, int maxPerson, int viewCount, StudyTypeDTO type, List<StudyCommentDTO> comments) {
        this.id = id;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.time = time;
        this.imgPath = imgPath;
        this.currentPerson = currentPerson;
        this.maxPerson = maxPerson;
        this.viewCount = viewCount;
        this.type = type;
        this.comments = comments;
    }
}
