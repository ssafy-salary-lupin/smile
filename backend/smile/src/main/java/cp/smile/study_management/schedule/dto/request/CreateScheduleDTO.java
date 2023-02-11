package cp.smile.study_management.schedule.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/*일정 생성 DTO*/
@Getter
@Setter
public class CreateScheduleDTO {

    private int studyId; //스터디 식별자
    private int scheduleTypeId;//스터디 타입 식별자.
    private String title; //일정 제목
    private String description; // 일정 내용
    private String startTime; // 일정 시작 일자
    private String endTime; // 일정 마감 일자
    private String url; // 일정 공고 url

    private String color; //일정 표시 색깔



}
