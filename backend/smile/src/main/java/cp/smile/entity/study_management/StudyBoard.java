package cp.smile.entity.study_management;

import cp.smile.config.BaseEntity;
import cp.smile.entity.study_common.StudyInformation;
import cp.smile.entity.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "study_boards")
@DynamicUpdate
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

    public void setWriter(User writer) {
        this.user = writer;
    }

    public void addTo(StudyInformation studyInformation) {
        this.studyInformation = studyInformation;
        studyInformation.getStudyBoards().add(this);
    }

    public void setStudyBoardComments(List<StudyBoardComment> studyBoardComments) {
        this.studyBoardComments = studyBoardComments;
    }

    public void setStudyBoardFiles(List<StudyBoardFile> studyBoardFiles) {
        this.studyBoardFiles = studyBoardFiles;
    }

    public void addViewCount() {
        this.viewCount += 1;
    }

    //삭제 메서드 - 삭제지만 실제로 삭제하지는 않고 값만 바꿈.
    public void deleteBoard(){
        this.isDeleted = true;
    }
}
