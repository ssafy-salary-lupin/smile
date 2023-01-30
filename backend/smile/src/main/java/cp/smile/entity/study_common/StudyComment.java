package cp.smile.entity.study_common;

import cp.smile.config.BaseEntity;
import cp.smile.entity.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
}
