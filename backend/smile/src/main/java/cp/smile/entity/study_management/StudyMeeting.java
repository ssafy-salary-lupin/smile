package cp.smile.entity.study_management;

import cp.smile.config.BaseEntity;
import cp.smile.entity.study_common.StudyInformation;
import cp.smile.entity.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "study_meeting")
public class StudyMeeting extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sm_id")
    private int id;
    @Column(name = "sm_name")
    private String name;
    @Column(name = "sm_is_end")
    private int isEnd;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "si_id")
    private StudyInformation studyInformation;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "smt_id")
    private StudyMeetingType studyMeetingType;

    @Builder
    public StudyMeeting(int id, String name, int isEnd, StudyInformation studyInformation, User user, StudyMeetingType studyMeetingType) {
        this.id = id;
        this.name = name;
        this.isEnd = isEnd;
        this.studyInformation = studyInformation;
        this.user = user;
        this.studyMeetingType = studyMeetingType;
    }
}
