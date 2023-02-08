package cp.smile.config;

import cp.smile.config.response.CommonResponse;
import cp.smile.config.response.ResponseService;
import cp.smile.config.response.exception.CustomException;
import cp.smile.config.response.exception.CustomExceptionStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Slf4j
@RequiredArgsConstructor
@RestControllerAdvice
public class ControllerAdvisor {



    private final ResponseService responseService;


    @ExceptionHandler(CustomException.class)
    public CommonResponse exceptionHandler(CustomException customException) {


        CustomExceptionStatus status = customException.getCustomExceptionStatus();

        //로그로 예외발생한 시간과 메시지 남기기
        log.warn("[" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss")) + "]" +" : " + status.getMessage());

        return responseService.getExceptionResponse(status);
    }

    @ExceptionHandler(RuntimeException.class)
    public CommonResponse exceptionHandler(Exception e) {


        CommonResponse response = new CommonResponse();
        response.setCode(400);
        response.setIsSuccess(false);
        response.setMessage(e.getMessage());

        return response;
    }
}
