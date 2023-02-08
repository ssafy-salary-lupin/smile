package cp.smile.config.response;

import cp.smile.config.response.exception.CustomExceptionStatus;
import org.springframework.stereotype.Service;

@Service
public class ResponseService {

    //응답 데이터가 없는 경우
    public CommonResponse getSuccessResponse(){
        CommonResponse response = new CommonResponse();
        response.setIsSuccess(true);
        response.setCode(200);
        response.setMessage("요청에 성공했습니다.");

        return response;
    }


    //응답 데이터가 있는 경우
    public <T> DataResponse<T> getDataResponse(T data,CustomSuccessStatus status){

        DataResponse<T> response = new DataResponse<>();
        response.setResult(data);
        response.setIsSuccess(status.getIsSuccess());
        response.setCode(status.getCode());
        response.setMessage(status.getMessages());

        return response;

    }

    //예외 응답
    public CommonResponse getExceptionResponse(CustomExceptionStatus status){
        CommonResponse response = new CommonResponse();
        response.setIsSuccess(status.getIsSuccess());
        response.setCode(status.getCode());
        response.setMessage(status.getMessage());

        return response;

    }
}
