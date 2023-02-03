package cp.smile.study_common.dto.request;

import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

/*스터디 생성시에 사용. - 유저로부터 받음.*/
@Getter
public class CreateStudyDTO {

    private String name; //스터디 이름
    private int typeId; //스터디 유형Id

    private int maxPerson;
    private String startDate;
    private String endDate;

    private String description; //스터디 설명
    private String time; //스터디 시간(ex. 미정)

}
