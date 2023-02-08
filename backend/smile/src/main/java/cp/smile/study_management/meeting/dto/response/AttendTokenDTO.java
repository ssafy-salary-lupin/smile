package cp.smile.study_management.meeting.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class AttendTokenDTO {

    private String sessionId;
    private String attendToken;

    public AttendTokenDTO(String sessionId, String attendToken) {
        this.sessionId = sessionId;
        this.attendToken = attendToken;
    }
}
