package cp.smile.study_management.meeting.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class MeetingCreationRequestDTO {

    private String meetingName;
    private Integer meetingTypeId;

    @Builder
    public MeetingCreationRequestDTO(String meetingName, Integer meetingTypeId) {
        this.meetingName = meetingName;
        this.meetingTypeId = meetingTypeId;
    }
}
