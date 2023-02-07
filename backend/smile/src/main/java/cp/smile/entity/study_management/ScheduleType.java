package cp.smile.entity.study_management;

import cp.smile.config.BaseEntity;
import cp.smile.study_management.schedule.dto.response.ScheduleTypeDTO;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "schedule_types")
public class ScheduleType extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sct_id")
    private int id;
    @Column(name = "sct_name")
    @Enumerated(EnumType.STRING)
    private ScheduleTypeName name;

    @Builder
    public ScheduleType(int id, ScheduleTypeName name) {
        this.id = id;
        this.name = name;
    }


    public ScheduleTypeDTO createScheduleTypeDTO(){
        return ScheduleTypeDTO.builder()
                .id(this.id)
                .name(this.name.toString()).build();
    }
}
