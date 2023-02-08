package cp.smile.study_management.meeting.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class MeetingCreationDTO {

    MeetingDTO meeting;
    AttendTokenDTO attend;

    public MeetingCreationDTO(MeetingDTO meeting, AttendTokenDTO attend) {
        this.meeting = meeting;
        this.attend = attend;
    }
}
