package cp.smile.entity.study_common;

import cp.smile.config.BaseEntity;
import cp.smile.entity.study_management.ChatMessage;
import cp.smile.entity.study_management.StudyBoard;
import cp.smile.entity.user.UserJoinStudy;
import cp.smile.study_management.chat.dto.ChatRoomDTO;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "study_informations")
public class StudyInformation extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "si_id")
    private int id;
    @Column(name = "si_name")
    private String name;

    @Column(name = "si_start_date")
    private LocalDate startDate;
    @Column(name = "si_end_date")
    private LocalDate endDate;
    @Column(name = "si_time")
    private String time; //스터디 하는 시간.
    @Column(name = "si_img")
    private String imgPath;
    @Column(name = "si_person")
    private int currentPerson; //현재 가입인원
    @Column(name = "si_max_person")
    private int maxPerson; //최대 가입 인원
    @Column(name = "si_desc")
    private String description;
    @Column(name = "si_view")
    private int viewCount; //조회수
    @Column(name = "si_deadline")
    private boolean deadline;
    @Column(name = "si_rule")
    private String rule;
    @Column(name = "si_chatroom_id")
    private String chatroomId;

    //TODO : 유형 식별자의 경우, 연관관계를 맺어둘 필요가 있을까 싶다. 어차피 조인 없이 따로 조회하게 될 텐데.
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "st_id")
    private StudyType studyType; //스터디 유형 식별자.
    @Column(name = "si_is_end")
    private boolean isEnd; //스터디 종료 여부
    @Column(name = "si_last_visited_time")
    private LocalDateTime lastVisitedTime; //마지막으로 조회한 시간.

    //스터디 조회시점에 댓글을 가져와야됨.
    @OneToMany(mappedBy = "studyInformation" , fetch = FetchType.LAZY) //
    Set<StudyComment> studyComments = new HashSet<>();

    //스터디 관리페이지에 들어갔을때, 가입된 유저 정보들을 가지고 있어야 됨.
    @OneToMany(mappedBy = "studyInformation", fetch = FetchType.LAZY)
    Set<UserJoinStudy> userJoinStudies = new HashSet<>(); // 유저 스터디 가입 정보

    @OneToMany(mappedBy = "studyInformation", fetch = FetchType.LAZY)
    Set<ChatMessage> chatMessages = new HashSet<>(); //채팅 메시지 테이블

    @OneToMany(mappedBy = "studyInformation", fetch = FetchType.LAZY)
    List<StudyBoard> studyBoards = new ArrayList<>();


    @Builder
    public StudyInformation(int id, String name, LocalDate startDate, LocalDate endDate, String time, String imgPath, int currentPerson, int maxPerson, String description, int viewCount, boolean deadline, String rule, String chatroomId, StudyType studyType, boolean isEnd, LocalDateTime lastVisitedTime) {
        this.id = id;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.time = time;
        this.imgPath = imgPath;
        this.currentPerson = currentPerson;
        this.maxPerson = maxPerson;
        this.description = description;
        this.viewCount = viewCount;
        this.deadline = deadline;
        this.rule = rule;
        this.chatroomId = chatroomId;
        this.studyType = studyType;
        this.isEnd = isEnd;
        this.lastVisitedTime = lastVisitedTime;
    }

    //채팅방 정보 객체 생성.
    public ChatRoomDTO createChatRoomDTO(){

        return ChatRoomDTO.builder()
                .roomId(this.id)
                .name(this.name).build();
    }
}
