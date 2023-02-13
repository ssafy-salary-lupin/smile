package cp.smile.study_common.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateStudyResponseDTO {

    private int id;


    @Builder
    public CreateStudyResponseDTO(int id) {
        this.id = id;
    }
}
