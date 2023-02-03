package cp.smile.study_management.board.dto.response;

import cp.smile.entity.study_management.StudyBoard;
import cp.smile.entity.study_management.StudyBoardType;
import cp.smile.entity.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class SimpleBoardDTO {
    private int studyId;
    private int boardId;
    private int views;
    private String title;
    private WriterDTO writer;
    private BoardTypeDTO boardType;
    private LocalDateTime writeAt;

    public static SimpleBoardDTO of(StudyBoard board) {
        SimpleBoardDTO dto = new SimpleBoardDTO();
        dto.studyId = board.getStudyInformation().getId();
        dto.boardId = board.getId();
        dto.views = board.getViewCount();
        dto.title = board.getTitle();
        dto.writer = WriterDTO.of(board.getUser());
        dto.boardType = BoardTypeDTO.of(board.getStudyBoardType());
        dto.writeAt = board.getCreateTime();
        return dto;
    }

    @Getter @Setter
    private static class WriterDTO {
        private int writerId; // 작성자 유저 식별자
        private String nickname; // 작성자 닉네임

        private static WriterDTO of(User user) {
            WriterDTO dto = new WriterDTO();
            dto.writerId = user.getId();
            dto.nickname = user.getNickname();
            return dto;
        }
    }

    @Getter @Setter
    private static class BoardTypeDTO {
        private int typeId; // 스터디 게시글 유형 식별자
        private String type; // 스터디 게시글 타입 이름

        private static BoardTypeDTO of(StudyBoardType type) {
            BoardTypeDTO dto = new BoardTypeDTO();
            dto.typeId = type.getId();
            dto.type = type.getName().name();
            return dto;
        }
    }
}