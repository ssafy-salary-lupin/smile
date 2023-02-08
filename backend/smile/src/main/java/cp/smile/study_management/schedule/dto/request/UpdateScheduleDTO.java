package cp.smile.study_management.schedule.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UpdateScheduleDTO {

    private String startTime;
    private String endTime;
    private Integer typeId;
    private String name;
    private String url;
    private String description;

    @Builder
    public UpdateScheduleDTO(String startTime, String endTime, Integer typeId, String name, String url,String description) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.typeId = typeId;
        this.name = name;
        this.url = url;
        this.description = description;
    }

    @Override
    public String toString() {
        return "UpdateScheduleDTO{" +
                "startTime='" + startTime + '\'' +
                ", endTime='" + endTime + '\'' +
                ", typeId=" + typeId +
                ", name='" + name + '\'' +
                ", url='" + url + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
