package cp.smile.study_common.dto.response;

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
}
