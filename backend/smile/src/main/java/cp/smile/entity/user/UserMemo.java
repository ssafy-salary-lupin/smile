package cp.smile.entity.user;

import cp.smile.config.BaseEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.boot.model.naming.Identifier;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@DynamicUpdate
@Entity
@Table(name = "user_memos")
public class UserMemo extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "um_id")
    private int id;

    @Column(name = "um_content")
    private String content;

    @Column(name = "um_x")
    private Integer posX;
    @Column(name = "um_y")
    private Integer posY;

    @Column(name = "um_is_deleted")
    private boolean isDeleted;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Builder
    public UserMemo(int id, String content, int posX, int posY, boolean isDeleted, User user) {
        this.id = id;
        this.content = content;
        this.posX = posX;
        this.posY = posY;
        this.isDeleted = isDeleted;
        this.user = user;
    }
}
