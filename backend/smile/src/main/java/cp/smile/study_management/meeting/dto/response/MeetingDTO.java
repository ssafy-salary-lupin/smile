package cp.smile.study_management.meeting.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

public class MeetingDTO {

    private String name;
    private int sessionId;
    private LocalDateTime startTime;
    private MeetingTypeDTO type;
    private MeetingStarterDTO starter;

    @Getter @Setter
    private static class MeetingTypeDTO {
        private int typeId;
        private String type;
    }

    @Getter @Setter
    private static class MeetingStarterDTO {
        private int starterId;
        private String name;
        private String profileImageUrl;
    }
}
