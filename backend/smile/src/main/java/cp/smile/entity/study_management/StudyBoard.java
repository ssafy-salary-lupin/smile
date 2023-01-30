package cp.smile.entity.study_management;

import cp.smile.config.BaseEntity;
import cp.smile.entity.study_common.StudyInformation;
import cp.smile.entity.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "study_boards")
public class StudyBoard extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sb_id")
    private int id;
    @Column(name = "sb_title")
    private String title;
    @Column(name = "sb_view")
    private int viewCount; //조회수
    @Column(name = "sb_content")
    private String content;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "si_id")
    private StudyInformation studyInformation;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sbt_id")
    private StudyBoardType studyBoardType;
    @Column(name = "sb_is_deleted")
    private boolean isDeleted;

    //게시글을 통해서 게시글 댓글도 조회해야됨
    @OneToMany(mappedBy = "studyBoard")
    List<StudyBoardComment> studyBoardComments = new ArrayList<>();

    //게시글을 통해서 게시판에 업로드된 파일을 조회할 수 있어야 됨.
    @OneToMany(mappedBy = "studyBoard")
    List<StudyBoardFile> studyBoardFiles = new ArrayList<>();


    @Builder
    public StudyBoard(int id, String title, int viewCount, String content, User user, StudyInformation studyInformation, StudyBoardType studyBoardType, boolean isDeleted) {
        this.id = id;
        this.title = title;
        this.viewCount = viewCount;
        this.content = content;
        this.user = user;
        this.studyInformation = studyInformation;
        this.studyBoardType = studyBoardType;
        this.isDeleted = isDeleted;
    }
}
