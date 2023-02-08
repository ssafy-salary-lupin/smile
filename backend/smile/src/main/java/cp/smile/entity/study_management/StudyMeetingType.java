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
@Table(name = "study_meeting_types")
public class StudyMeetingType extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "smt_id")
    private int id;
    @Column(name = "smt_name")
    @Enumerated(EnumType.STRING)
    private StudyMeetingTypeName name;

    @Builder
    public StudyMeetingType(int id, StudyMeetingTypeName name) {
        this.id = id;
        this.name = name;
    }
}
