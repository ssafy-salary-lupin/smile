package cp.smile.study_management.home.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Getter
@Setter
public class ScheduleDdayDTO {


    private int id; //일정 식별자
    private int day; //날짜
    private String title; //일정 제목

    @Builder
    public ScheduleDdayDTO(int id, int day, String title) {
        this.id = id;
        this.day = day;
        this.title = title;
    }
}
