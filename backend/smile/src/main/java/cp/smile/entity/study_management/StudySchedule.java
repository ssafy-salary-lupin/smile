package cp.smile.entity.study_management;


import cp.smile.config.BaseEntity;
import cp.smile.entity.study_common.StudyInformation;
import cp.smile.study_management.home.dto.response.ScheduleDdayDTO;
import cp.smile.study_management.schedule.dto.request.UpdateScheduleDTO;
import cp.smile.study_management.schedule.dto.response.ScheduleDTO;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.format.DateTimeFormatter;


@Getter
@NoArgsConstructor
@DynamicUpdate //변경되는 값만 쿼리가 날아가도록 수정.
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

    public ScheduleDTO createScheduleDTO(){
        return ScheduleDTO.builder()
                .id(this.id)
                .title(this.name)
                .type(this.scheduleType.createScheduleTypeDTO())
                .startTime(this.startTime)
                .endTime(this.endTime)
                .url(this.url)
                .description(this.description).build();
    }

    public ScheduleDdayDTO createScheduleDdayDTO(LocalDateTime currentTime){

        //두 날짜 간격 구하기
        Period period = Period.between(currentTime.toLocalDate(),this.endTime.toLocalDate());


        return ScheduleDdayDTO.builder()
                .id(this.id)
                .day(period.getDays())
                .title(this.name)
                .build();
    }

    /* 스터디 일정 수정 */
    public void updateStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public void updateEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public void updateScheduleType(ScheduleType scheduleType) {
        this.scheduleType = scheduleType;
    }

    public void updateName(String name) {
        this.name = name;
    }

    public void updateDescription(String description) {
        this.description = description;
    }

    public void updateUrl(String url) { this.url = url; }

    public void deleteSchedule() {
        this.isDeleted = true;
    }


}
