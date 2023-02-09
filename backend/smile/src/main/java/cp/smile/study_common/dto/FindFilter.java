package cp.smile.study_common.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class FindFilter {

    private int type;
    private String title;

    @Builder
    public FindFilter(int type, String title) {
        this.type = type;
        this.title = title;
    }
}
