package cp.smile.study_common.dto;

import lombok.Builder;
import lombok.Getter;

/**스터디 조회용 필터*/
@Getter
public class FindFilter {

    private int type; //스터디 분류
    private String name; //스터디 제목에 들어갈 키워드


}
