package cp.smile.entity.study_common;


import cp.smile.config.BaseEntity;
import cp.smile.entity.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;


@Getter
@NoArgsConstructor
@Entity
@Table(name = "study_replies")
public class StudyReply extends BaseEntity {


    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sr_id")
    private int id;
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "sc_id")
    private StudyComment studyComment;
    @Column(name = "sr_content")
    private String content;
    @Column(name = "sr_is_deleted")
    private Boolean isDeleted;

    @Builder
    public StudyReply(int id, User user, StudyComment studyComment, String content, Boolean isDeleted) {
        this.id = id;
        this.user = user;
        this.studyComment = studyComment;
        this.content = content;
        this.isDeleted = isDeleted;
    }
}
