package cp.smile.auth.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import cp.smile.config.response.CommonResponse;
import cp.smile.config.response.ResponseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static cp.smile.auth.jwt.JwtAuthenticationFilter.*;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private static ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        String exception = (String) request.getAttribute(TOKEN_EXCEPTION_KEY);

        CommonResponse commonResponse = new CommonResponse();
        commonResponse.setCode(HttpStatus.UNAUTHORIZED.value());
        commonResponse.setIsSuccess(false);
        commonResponse.setMessage(exception);

        if (!response.isCommitted()) {
            response.getWriter().write(objectMapper.writeValueAsString(commonResponse));
        }
    }
}
