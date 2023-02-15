package cp.smile.entity.study_common;

import cp.smile.config.BaseEntity;
import cp.smile.entity.user.User;
import cp.smile.study_common.dto.response.comment.StudyCommentDTO;
import cp.smile.study_common.dto.response.comment.StudyReplyDTO;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

// TODO : Setter는 나중에 빼고, 연관관계 메서드를 만들어서 처리하도록 해야됨.

@Getter
@NoArgsConstructor
@Entity
@Table(name = "study_comments")
public class StudyComment extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sc_id")
    private int id;
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user; //유저 식별자 - 유저에서 댓글을 조회하는 요구사항은 없기 때문에 반대의 경우는 매핑하지 않음.
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "si_id")
    private StudyInformation studyInformation; //스터디 식별자
    @Column(name = "sc_content")
    private String content;
    @Column(name = "sc_is_deleted")
    private boolean isDeleted;

    //댓글에 연결된 대댓글을 조회하기 때문에 연관관계를 양방향으로 맺음.
//    @JsonManagedReference
    @OneToMany(mappedBy = "studyComment")
    List<StudyReply> studyRelies = new ArrayList<>();

    @Builder
    public StudyComment(int id, User user, StudyInformation studyInformation, String content, boolean isDeleted) {
        this.id = id;
        this.user = user;
        this.studyInformation = studyInformation;
        this.content = content;
        this.isDeleted = isDeleted;
    }

    /*스터디 상세조회 댓글 DTO 변환*/
    public StudyCommentDTO createStudyCommentDTO(){

        List<StudyReplyDTO> studyReplyDTOS = studyRelies.stream()
                .filter((reply) -> reply.getIsDeleted() == false)
                .map(StudyReply::createStudyReplyDTO)
                .collect(Collectors.toList());

        return StudyCommentDTO.builder()
                .id(this.id)
                .user(this.user.createUserProfileDTO())
                .content(this.content)
                .replies(studyReplyDTOS).build();
    }



    public void updateStudyComment(String content){
        this.content = content;
    }

    public void deleteStudyComment(){
        this.isDeleted = true;
    }
}
