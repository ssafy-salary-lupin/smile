package cp.smile.user.dto.response;

import cp.smile.entity.study_common.StudyInformation;
import cp.smile.entity.user.User;
import cp.smile.entity.user.UserJoinStudy;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter @Setter
@NoArgsConstructor
public class UserJoinedStudies {

    private int studiesCount;
    private List<SimpleStudyDTO> studies;

    public static UserJoinedStudies of(List<UserJoinStudy> userJoinStudies) {
        UserJoinedStudies dto = new UserJoinedStudies();
        List<SimpleStudyDTO> list = userJoinStudies.stream().map(SimpleStudyDTO::of).collect(Collectors.toList());
        dto.setStudies(list);
        dto.setStudiesCount(list.size());
        return dto;
    }

    @Getter @Setter
    @NoArgsConstructor
    private static class SimpleStudyDTO {
        private int id; // 스터디 식별번호
        private String name; // 스터디 이름
        private String imagePath; // 스터디 대표 이미지 주소
        private String description; // 스터디 소개
        private int currentPerson; // 현재 가입한 스터디인원
        private int maxPerson; // 최대 스터디원수
        private int viewCount; // 조회수
        private LocalDateTime lastVisitTime; // 최근 조회 시간
        private boolean isEnd;
        private StudyLeader leader;

        private static SimpleStudyDTO of(UserJoinStudy userJoinStudy) {
            return of(userJoinStudy.getStudyInformation(), userJoinStudy.getUser());
        }

        private static SimpleStudyDTO of(StudyInformation studyInformation, User leader) {
            SimpleStudyDTO dto = new SimpleStudyDTO();
            dto.id = studyInformation.getId();
            dto.name = studyInformation.getName();
            dto.imagePath = studyInformation.getImgPath();
            dto.description = studyInformation.getDescription();
            dto.currentPerson = studyInformation.getCurrentPerson();
            dto.maxPerson = studyInformation.getMaxPerson();
            dto.viewCount = studyInformation.getViewCount();
            dto.lastVisitTime = studyInformation.getLastVisitedTime();
            dto.isEnd = studyInformation.isEnd();
            dto.leader = StudyLeader.of(leader);

            return dto;
        }
    }

    @Getter @Setter
    @NoArgsConstructor
    private static class StudyLeader {
        private int id; // 스터디장 유저 식별번호
        private String imagePath; // 스터디장 프로필 사진 주소
        private String nickname; // 스터디장 닉네임

        private static StudyLeader of(User user) {
            StudyLeader StudyLeader = new StudyLeader();
            StudyLeader.id = user.getId();
            StudyLeader.imagePath = user.getImagePath();
            StudyLeader.nickname = user.getNickname();

            return StudyLeader;
        }
    }
}
