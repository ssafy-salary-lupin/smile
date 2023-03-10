package cp.smile.study_management.meeting.dto.response;

import cp.smile.entity.study_management.StudyMeeting;
import cp.smile.entity.study_management.StudyMeetingStatus;
import cp.smile.entity.study_management.StudyMeetingType;
import cp.smile.entity.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
@NoArgsConstructor
public class MeetingDTO {

    private int meetingId;
    private String name;
    private String sessionId;
    private LocalDateTime startTime;
    private MeetingTypeDTO type;
    private MeetingStarterDTO starter;
    private StudyMeetingStatus status;

    public MeetingDTO(String sessionId, StudyMeeting meeting) {
        this.sessionId = sessionId;
        this.meetingId = meeting.getId();
        this.name = meeting.getName();
        this.startTime = meeting.getCreateTime();
        this.type = MeetingTypeDTO.of(meeting.getStudyMeetingType());
        this.starter = MeetingStarterDTO.of(meeting.getUser());
        this.status = StudyMeetingStatus.valueOf(meeting.getIsEnd());

    }

    @Getter @Setter
    private static class MeetingStarterDTO {
        private int starterId;
        private String nickname;
        private String profileImageUrl;

        public static MeetingStarterDTO of(User starter) {
            MeetingStarterDTO dto = new MeetingStarterDTO();
            dto.starterId = starter.getId();
            dto.nickname = starter.getNickname();
            dto.profileImageUrl = starter.getImagePath();
            return dto;
        }
    }
}
