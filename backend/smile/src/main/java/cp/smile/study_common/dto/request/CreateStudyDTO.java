package cp.smile.study_common.dto.request;

import cp.smile.entity.study_common.StudyInformation;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

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


    public StudyInformation createStudyInformation(String imagePath){

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        String uuid = UUID.randomUUID().toString();

        return StudyInformation.builder()
                .name(this.name)
                .startDate(LocalDate.parse(this.startDate, formatter))
                .endDate(LocalDate.parse(this.endDate, formatter))
                .time(this.time)
                .currentPerson(1)
                .maxPerson(this.maxPerson)
                .description(this.getDescription())
                .viewCount(0)
                .deadline(false)
                .chatroomId(uuid)
                .isEnd(false)
                .imgPath(imagePath)
                .lastVisitedTime(LocalDateTime.now()).build();
    }

}
