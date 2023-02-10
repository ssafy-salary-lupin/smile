package cp.smile.study_management.meeting.dto.response;

import cp.smile.entity.study_management.StudyMeetingType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class MeetingTypeDTO {

    private int id;
    private String name;

    public static MeetingTypeDTO of(StudyMeetingType studyMeetingType) {
        MeetingTypeDTO dto = new MeetingTypeDTO();
        dto.id = studyMeetingType.getId();
        dto.name = studyMeetingType.getName().name();
        return dto;
    }
}
