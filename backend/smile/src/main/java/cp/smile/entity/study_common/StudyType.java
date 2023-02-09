package cp.smile.entity.study_common;

import cp.smile.config.BaseEntity;
import cp.smile.study_common.dto.response.StudyTypeDTO;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;


@Getter
@NoArgsConstructor
@Entity
@Table(name = "study_types")
public class StudyType extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "st_id")
    private int id;
    @Column(name = "st_name")
    @Enumerated(EnumType.STRING)
    private String name;

    @Builder
    public StudyType(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public StudyTypeDTO createStudyTypeDTO(){
        return StudyTypeDTO.builder()
                .id(this.id)
                .name(this.name).build();
    }
}
