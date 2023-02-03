package cp.smile.entity.study_management;

import cp.smile.config.BaseEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "study_board_files")
public class StudyBoardFile extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sbf_id")
    private int id;
    @Column(name = "sbf_name")
    private String name;
    @Column(name = "sbf_path")
    private String path;

    @ManyToOne
    @JoinColumn(name = "sb_id")
    private StudyBoard studyBoard; //게시판 식별자
    @Column(name = "sbf_is_deleted")
    private boolean isDeleted;

    @Builder
    public StudyBoardFile(int id, String name, String path, StudyBoard studyBoard, boolean isDeleted) {
        this.id = id;
        this.name = name;
        this.path = path;
        this.studyBoard = studyBoard;
        this.isDeleted = isDeleted;
    }
}
