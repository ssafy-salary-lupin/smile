package cp.smile.study_management.admin.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FindStudyJoinedUserDTO {

    private int id;
    private String nickname;
    private String email;
//    private String imgPath;
    private boolean isLeader;

    @Builder
    public FindStudyJoinedUserDTO(int id, String nickname, String email, boolean isLeader) {
        this.id = id;
        this.nickname = nickname;
        this.email = email;
//        this.imgPath = imgPath;
        this.isLeader = isLeader;
    }
}
