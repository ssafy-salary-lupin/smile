package cp.smile.config;

import cp.smile.config.response.CommonResponse;
import cp.smile.config.response.ResponseService;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ControllerAdvisor {

    @ExceptionHandler(RuntimeException.class)
    public CommonResponse exceptionHandler(Exception e) {

        CommonResponse response = new CommonResponse();
        response.setCode(400);
        response.setIsSuccess(false);
        response.setMessage(e.getMessage());

        return response;
    }
}
