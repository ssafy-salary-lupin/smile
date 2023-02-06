package cp.smile.entity.user;


import cp.smile.config.BaseEntity;
import cp.smile.entity.study_common.StudyInformation;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "user_join_studies")
public class UserJoinStudy extends BaseEntity {

    @EmbeddedId
    private UserJoinStudyId id;


    // TODO : 연관관계 편의 메서드를 정의해서 양쪽에 값이 모두 들어가도록 만들어야됨.
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

    public void connectUserAndStudy(User user, StudyInformation study) {
        this.user = user;
        user.getUserJoinStudy().add(this);

        this.studyInformation = study;
        study.getUserJoinStudies().add(this);

//        UserJoinStudyId.builder()
//                .userId(user.getId())
//                .studyInformationId(study.getId())
//                .build();
    }

    public void delegate() {
        this.isLeader = true;
    }

    public void dismissal() {
        this.isLeader = false;
    }

    public void ban() {
        this.isBan = true;
    }
}
