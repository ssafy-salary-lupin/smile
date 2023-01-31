package cp.smile.auth.controller;

import cp.smile.auth.oauth2.CustomOAuth2User;
import cp.smile.auth.service.AuthService;
import cp.smile.config.response.DataResponse;
import cp.smile.config.response.ResponseService;
import cp.smile.util.CookieUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@Slf4j
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final ResponseService responseService;

    @GetMapping("/reissue")
    public DataResponse<Map<String, String>> reissueAccessToken(@RequestHeader("Authorization") String authorization, HttpServletRequest request) {
        if (!StringUtils.hasText(authorization) || !authorization.startsWith("Bearer ")) {
            throw new IllegalStateException("유효하지 않는 토큰입니다.");
        }

        String oldAccessToken = authorization.substring(7);
        String refreshToken = CookieUtils.getCookie(request, "refresh")
                .orElseThrow(() -> new IllegalStateException("리프레시 토큰이 없습니다.")).getValue();

        Map<String, String> response = new HashMap<>();
        response.put("accessToken", authService.reissueAccessToken(oldAccessToken, refreshToken));

        return responseService.getDataResponse(response);
    }

    @GetMapping("/permitall")
    public String permitAll() {
        return "permit all";
    }

    @GetMapping("/authenticated")
    public String authenticated(@AuthenticationPrincipal CustomOAuth2User oAuth2User) {
        log.info("principal: {}", oAuth2User.getUserId());
        return "authenticated";
    }
}
