package cp.smile.study_management.schedule.dto.response;

import cp.smile.entity.study_management.ScheduleType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
public class ScheduleTypeDTO {

    private int id; //식별자
    private String name; //타입이름


    @Builder
    public ScheduleTypeDTO(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public static ScheduleTypeDTO of(ScheduleType type) {
        return ScheduleTypeDTO.builder()
                .id(type.getId())
                .name(type.getName().name())
                .build();
    }

}
