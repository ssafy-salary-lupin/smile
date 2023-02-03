package cp.smile.study_common.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/*스터디 전체 조회에 사용*/
@Getter
@Setter
public class FindAllStudyDTO {

    private int id; // 식별자
    private String imgPath; //이미지 경로(s3 주소가 들어갈 예정.)
    private int person; //현재 가입한 인원수
    private int maxPerson; //최대 인원수
    private String description; //스터디 설명.
    private int viewCount; //조회수

    private LocalDateTime lastVisitedTime; //마지막으로 수정한 시간.

    private StudyTypeDTO type; //스터디 타입

    private int commentCount; //스터디 댓글 수
    private UserProfileDTO leader; //리더 정보


    @Builder
    public FindAllStudyDTO(int id, String imgPath, int person, int maxPerson, String description, int viewCount, LocalDateTime lastVisitedTime, StudyTypeDTO type, int commentCount, UserProfileDTO leader) {
        this.id = id;
        this.imgPath = imgPath;
        this.person = person;
        this.maxPerson = maxPerson;
        this.description = description;
        this.viewCount = viewCount;
        this.lastVisitedTime = lastVisitedTime;
        this.type = type;
        this.commentCount = commentCount;
        this.leader = leader;
    }
}
