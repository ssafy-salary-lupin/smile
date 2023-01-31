package cp.smile.entity.study_management;


import cp.smile.config.BaseEntity;
import cp.smile.entity.study_common.StudyInformation;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;


@Getter
@NoArgsConstructor
@Entity
@Table(name = "study_schedules")
public class StudySchedule extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ss_id")
    private int id;
    @Column(name = "ss_start_time")
    private LocalDateTime startTime;
    @Column(name = "ss_end_time")
    private LocalDateTime endTime;
    @Column(name = "ss_name")
    private String name;
    @Column(name = "ss_desc")
    private String description;
    @Column(name = "ss_part")
    private int part;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "si_id")
    private StudyInformation studyInformation;
    @Column(name = "ss_is_deleted")
    private Boolean isDeleted;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sct_id")
    private ScheduleType scheduleType;

    @Column(name = "ss_url")
    private String url;

    @Builder
    public StudySchedule(int id, LocalDateTime startTime, LocalDateTime endTime, String name, String description, int part, StudyInformation studyInformation, Boolean isDeleted, ScheduleType scheduleType, String url) {
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.name = name;
        this.description = description;
        this.part = part;
        this.studyInformation = studyInformation;
        this.isDeleted = isDeleted;
        this.scheduleType = scheduleType;
        this.url = url;
    }
}
