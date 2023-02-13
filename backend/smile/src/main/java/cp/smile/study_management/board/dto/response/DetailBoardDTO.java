package cp.smile.study_management.board.dto.response;

import cp.smile.entity.study_management.StudyBoard;
import cp.smile.entity.study_management.StudyBoardComment;
import cp.smile.entity.study_management.StudyBoardFile;
import cp.smile.entity.study_management.StudyBoardType;
import cp.smile.entity.user.User;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter @Setter
@NoArgsConstructor
public class DetailBoardDTO {

    /**
     * SimpleBoardDTO와 겹치는 데이터가 너무 많음
     * 상속받아 사용할 수 있도록 리팩토링 필요
     */

    private int studyId;
    private int boardId;
    private BoardTypeDTO boardType;
    private String title;
    private String content;
    private WriterDTO writer;
    private LocalDateTime writeAt;
    private int views;
    private int commentCount;
    private List<BoardCommentDTO> comments;
    private int fileCount;
    private List<FileDTO> files;

    public static DetailBoardDTO of(StudyBoard studyBoard) {
        DetailBoardDTO dto = new DetailBoardDTO();
        dto.studyId = studyBoard.getStudyInformation().getId();
        dto.boardId = studyBoard.getId();
        dto.boardType = BoardTypeDTO.of(studyBoard.getStudyBoardType());
        dto.title = studyBoard.getTitle();
        dto.content = studyBoard.getContent();
        dto.writer = WriterDTO.of(studyBoard.getUser());
        dto.writeAt = studyBoard.getCreateTime();
        dto.views = studyBoard.getViewCount();
        dto.commentCount = studyBoard.getStudyBoardComments().size();
        dto.comments = studyBoard.getStudyBoardComments().stream().map(BoardCommentDTO::of).collect(Collectors.toList());
        dto.fileCount = studyBoard.getStudyBoardFiles().size();
        dto.files = studyBoard.getStudyBoardFiles().stream().map(FileDTO::of).collect(Collectors.toList());
        return dto;
    }

    @Getter @Setter
    private static class WriterDTO {
        private int writerId; // 작성자 유저 식별자
        private String nickname;
        private String profileImageUrl;

        public static WriterDTO of(User writer) {
            WriterDTO dto = new WriterDTO();
            dto.writerId = writer.getId();
            dto.nickname = writer.getNickname();
            dto.profileImageUrl = writer.getImagePath();
            return dto;
        }
    }

    @Getter @Setter
    private static class BoardCommentDTO {
        private int commentId;
        private String content;
        private WriterDTO writer;
        private LocalDateTime writeAt;

        public static BoardCommentDTO of(StudyBoardComment comment) {
            BoardCommentDTO dto = new BoardCommentDTO();
            dto.commentId = comment.getId();
            dto.content = comment.getContent();
            dto.writer = WriterDTO.of(comment.getUser());
            dto.writeAt = comment.getCreateTime();
            return dto;
        }
    }

    @Getter @Setter
    private static class FileDTO {

        private int fileId;
        private String fileName;
        private String sourceUrl;

        public static FileDTO of(StudyBoardFile file) {
            FileDTO dto = new FileDTO();
            dto.fileId = file.getId();
            dto.fileName = file.getName();
            dto.sourceUrl = file.getPath();
            return dto;
        }
    }
}
