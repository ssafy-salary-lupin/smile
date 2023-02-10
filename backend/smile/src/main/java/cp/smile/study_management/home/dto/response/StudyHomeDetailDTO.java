package cp.smile.study_management.home.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class StudyHomeDetailDTO {
    private String imagePath;
    private String name;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private String time;
    private String rule;
    private List<UserNicknameDTO> users;

    @Builder
    public StudyHomeDetailDTO(String imagePath, String name, String description, LocalDate startDate, LocalDate endDate, String time, String rule, List<UserNicknameDTO> users) {
        this.imagePath = imagePath;
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.time = time;
        this.rule = rule;
        this.users = users;
    }
}
