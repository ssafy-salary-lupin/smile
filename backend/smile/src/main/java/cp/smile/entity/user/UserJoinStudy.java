package cp.smile.entity.user;


import cp.smile.config.BaseEntity;
import cp.smile.entity.study_common.StudyInformation;
import cp.smile.study_common.dto.response.UserProfileDTO;
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
    private boolean isLeader;
    @Column(name = "ujs_is_ban")
    private boolean isBan;

    @Column(name = "ujs_is_deleted")
    private boolean isDeleted;

    @Builder
    public UserJoinStudy(UserJoinStudyId id, User user, StudyInformation studyInformation, boolean isLeader, boolean isBan, boolean isDeleted) {
        this.id = id;
        this.user = user;
        this.studyInformation = studyInformation;
        this.isLeader = isLeader;
        this.isBan = isBan;
        this.isDeleted = isDeleted;
    }

    //유저가입정보 - 스터디 생성시 리더
    public static UserJoinStudy createStudyJoinLeader(UserJoinStudyId userJoinStudyId, User user, StudyInformation studyInformation){

        return UserJoinStudy.builder()
                .id(userJoinStudyId)
                .user(user)
                .studyInformation(studyInformation)
                .isLeader(true).build();

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

    public UserProfileDTO createLeaderProfileDTO(){
        return this.user.createUserProfileDTO();
    }


    public void delegate() {
        this.isLeader = true;
    }

    public void dismissal() {
        this.isLeader = false;
    }

    public void ban() {
        this.isBan = true;
        leave();
    }

    public void leave() {
        this.isDeleted = true;
        for (UserJoinStudy userJoinStudy : user.getUserJoinStudy()) {
            if (userJoinStudy == this) {
                user.getUserJoinStudy().remove(this);
                break;
            }
        }

        this.studyInformation.leavePerson();
        for (UserJoinStudy userJoinStudy : studyInformation.getUserJoinStudies()) {
            if (userJoinStudy == this) {
                studyInformation.getUserJoinStudies().remove(this);
            }
        }
    }
}
