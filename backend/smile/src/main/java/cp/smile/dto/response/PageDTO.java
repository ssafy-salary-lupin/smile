package cp.smile.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter @Setter
@NoArgsConstructor
@ToString
public class PageDTO<T> {

    private int page; // 현재 페이지 수
    private int size; // 페이지당 컨텐츠 크기
    private int totalPages; // 전체 페이지 수
    private long totalElements; // 전체 데이터 수
    private boolean hasContent; // 데이터의 유무

    @JsonProperty("isFirst") private boolean isFirst; // 첫 페이지 유뮤
    @JsonProperty("isLast") private boolean isLast; // 마지막 페이지인지
    private boolean hasPrevious; // 이전 페이지 유무
    private boolean hasNext; // 다음 페이지 유무
    private List<T> content; // 조회결과 리스트

    public static <T> PageDTO<T> of(Page<?> page, List<T> content) {
        PageDTO<T> dto = new PageDTO<>();
        dto.page = page.getNumber() + 1;
        dto.size = page.getSize();
        dto.totalPages = page.getTotalPages();
        dto.totalElements = page.getTotalElements();
        dto.hasContent = page.hasContent();
        dto.isFirst = page.isFirst();
        dto.isLast = page.isLast();
        dto.hasPrevious = page.hasPrevious();
        dto.hasNext = page.hasNext();
        dto.content = content;
        return dto;
    }
}
