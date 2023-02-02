package cp.smile.study_common.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudyUserProfileDTO {

    private int id; //식별자
    private String imgPath; //프로필 이미지 경로 - s3 주소가 들어갈 예정
    private String nickname; //유저 닉네임.

    @Builder
    public StudyUserProfileDTO(int id, String imgPath, String nickname) {
        this.id = id;
        this.imgPath = imgPath;
        this.nickname = nickname;
    }
}
