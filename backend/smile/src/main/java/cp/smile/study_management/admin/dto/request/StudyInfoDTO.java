package cp.smile.study_management.admin.dto.request;

import cp.smile.study_common.dto.response.StudyTypeDTO;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class StudyInfoDTO {

    private String name;
    private String endDate;
    private String time;
    private Integer maxPerson;
    private int typeId;
    private String description;
    private String rule;

    @Builder
    public StudyInfoDTO(String name, String endDate, String time, Integer maxPerson, int typeId, String description, String rule) {
        this.name = name;
        this.endDate = endDate;
        this.time = time;
        this.maxPerson = maxPerson;
        this.typeId = typeId;
        this.description = description;
        this.rule = rule;
    }
}
