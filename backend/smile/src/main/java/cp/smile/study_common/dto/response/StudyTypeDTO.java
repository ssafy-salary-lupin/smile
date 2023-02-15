package cp.smile.study_common.dto.response;

import cp.smile.entity.study_common.StudyType;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudyTypeDTO {

    private int id; //식별자.
    private String name; //스터디 이름


    @Builder
    public StudyTypeDTO(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public static StudyTypeDTO of(StudyType type) {
        return StudyTypeDTO.builder()
                .id(type.getId())
                .name(type.getName().name())
                .build();
    }


}
