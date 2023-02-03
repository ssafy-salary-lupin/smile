package cp.smile.study_management.schedule.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ScheduleTypeDTO {

    private int id; //식별자
    private String name; //타입이름


    @Builder
    public ScheduleTypeDTO(int id, String name) {
        this.id = id;
        this.name = name;
    }

}
