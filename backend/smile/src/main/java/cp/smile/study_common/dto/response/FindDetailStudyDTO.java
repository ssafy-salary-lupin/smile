package cp.smile.study_common.dto.response;


import cp.smile.study_common.dto.response.comment.StudyCommentDTO;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

/*스터디 상세정보 조회시 사용*/
@Getter
public class FindDetailStudyDTO {

    private int id; // 스터디 식별자
    private String name; // 스터디 이름
    private LocalDate startDate;
    private LocalDate endDate;
    private String time;
    private String imagePath;
    private int currentPerson;
    private int maxPerson;
    private int viewCount;
    private String description; //스터디 설명.

    private StudyTypeDTO type; //스터디 타입

    private UserProfileDTO leader; // 스터디 리더 정보.
    private List<StudyCommentDTO> comments; //댓글 정보


    @Builder
    public FindDetailStudyDTO(int id, String name, LocalDate startDate, LocalDate endDate, String time, String imagePath, int currentPerson, int maxPerson, int viewCount, String description,StudyTypeDTO type,UserProfileDTO leader, List<StudyCommentDTO> comments) {
        this.id = id;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.time = time;
        this.imagePath = imagePath;
        this.currentPerson = currentPerson;
        this.maxPerson = maxPerson;
        this.viewCount = viewCount;
        this.description = description;
        this.type = type;
        this.leader = leader;
        this.comments = comments;

    }
}
