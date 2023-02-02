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
@Table(name = "chat_messages")
public class ChatMessage extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cm_id")
    private Long id;
    @Column(name = "cm_content")
    private String content;
    @Column(name = "cm_send_time")
    private LocalDateTime sendTime; //보낸시간
    @Column(name = "cm_session")
    private String session;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "si_id")
    private StudyInformation studyInformation;

    @Builder
    public ChatMessage(Long id, String content, LocalDateTime sendTime, String session, User user, StudyInformation studyInformation) {
        this.id = id;
        this.content = content;
        this.sendTime = sendTime;
        this.session = session;
        this.user = user;
        this.studyInformation = studyInformation;
    }
}
