package cp.smile.entity.user;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Embeddable
public class UserJoinStudyId implements Serializable {

//    @Column(name = "user_id")
    private int userId;
//    @Column(name = "si_id")
    private int studyInformationId;

    @Override
    public boolean equals(Object obj) {
        if(this == obj) return true;
        if(obj == null || getClass() != obj.getClass()) return false;
        UserJoinStudyId usi = (UserJoinStudyId) obj;
        return this.userId == usi.userId && this.studyInformationId == usi.studyInformationId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId,studyInformationId);
    }
}
