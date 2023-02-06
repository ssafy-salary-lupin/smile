package cp.smile.config.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CommonResponse {

    public Boolean isSuccess;

    public int code;

    public String message;
}
