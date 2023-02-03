package cp.smile.entity.study_management;

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
@Table(name = "study_board_comments")
public class StudyBoardComment extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sbc_id")
    private int id;
    @Column(name = "sbc_content")
    private String content;

    @ManyToOne
    @JoinColumn(name = "sb_id")
    private StudyBoard studyBoard;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @Column(name = "sbc_is_deleted")
    private boolean isDeleted;

    @Builder
    public StudyBoardComment(int id, String content, StudyBoard studyBoard, User user, boolean isDeleted) {
        this.id = id;
        this.content = content;
        this.studyBoard = studyBoard;
        this.user = user;
        this.isDeleted = isDeleted;
    }
}
