package cp.smile.study_management.board.dto.response;

import cp.smile.entity.study_management.StudyBoardType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class BoardTypeDTO {

    private int id; // 스터디 게시글 유형 식별자
    private String name; // 스터디 게시글 타입 이름

    public static BoardTypeDTO of(StudyBoardType type) {
        BoardTypeDTO dto = new BoardTypeDTO();
        dto.id = type.getId();
        dto.name = type.getName().name();
        return dto;
    }
}
