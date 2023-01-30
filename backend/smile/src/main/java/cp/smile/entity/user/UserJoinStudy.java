package cp.smile.entity.user;


import cp.smile.config.BaseEntity;
import cp.smile.entity.study_common.StudyInformation;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "user_join_studies")
public class UserJoinStudy extends BaseEntity {

    @EmbeddedId
    private UserJoinStudyId id;

    @MapsId("userId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user; //user 테이블

    @MapsId("studyInformationId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "si_id")
    private StudyInformation studyInformation;

    @Column(name = "ujs_is_leader")
    private Boolean isLeader;
    @Column(name = "ujs_is_ban")
    private Boolean isBan;

    @Column(name = "ujs_is_deleted")
    private Boolean isDeleted;

    @Builder
    public UserJoinStudy(UserJoinStudyId id, User user, StudyInformation studyInformation, Boolean isLeader, Boolean isBan, Boolean isDeleted) {
        this.id = id;
        this.user = user;
        this.studyInformation = studyInformation;
        this.isLeader = isLeader;
        this.isBan = isBan;
        this.isDeleted = isDeleted;
    }
}
