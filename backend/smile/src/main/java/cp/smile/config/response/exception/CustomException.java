package cp.smile.config.response.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 응답 예외로 사용할 직접 커스텀한 예외
 * 예외 발생시, 예외가 올라와서 controller advisor가 잡아서 처리할 수 있게 unchecked 예외인 runtimeException으로 잡음.
 */
@Getter
@AllArgsConstructor
public class CustomException extends RuntimeException{

    CustomExceptionStatus customExceptionStatus;

}
