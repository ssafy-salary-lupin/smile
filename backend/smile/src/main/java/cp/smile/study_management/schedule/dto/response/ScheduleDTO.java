package cp.smile.study_management.schedule.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ScheduleDTO {

    private int id;
    private LocalDateTime startTime;
    private LocalDateTime endTime;

    private String title; //일정 제목

    private String description;
    private String url;

    private ScheduleTypeDTO type; //타입



    @Builder
    public ScheduleDTO(int id, LocalDateTime startTime, LocalDateTime endTime, String title, String description, String url, ScheduleTypeDTO type) {
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.title = title;
        this.description = description;
        this.url = url;
        this.type = type;
    }
}
