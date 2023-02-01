package cp.smile.entity.study_management;

import cp.smile.config.BaseEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "study_board_types")
public class StudyBoardType extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sbt_id")
    private int id;
    @Column(name = "sbt_type")
    @Enumerated(EnumType.STRING)
    private StudyBoardTypeName name;

    @Builder
    public StudyBoardType(int id, StudyBoardTypeName name) {
        this.id = id;
        this.name = name;
    }
}
