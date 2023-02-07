package cp.smile.auth.oauth2;

import com.fasterxml.jackson.databind.ObjectMapper;
import cp.smile.auth.jwt.JwtProvider;
import cp.smile.auth.oauth2.exception.UnsupportedOAuthProviderException;
import cp.smile.auth.oauth2.provider.LoginProviderRepository;
import cp.smile.config.response.ResponseService;
import cp.smile.entity.user.LoginProvider;
import cp.smile.entity.user.User;
import cp.smile.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Component
@Slf4j
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtProvider jwtProvider;
    private final UserService userService;
    private final LoginProviderRepository loginProviderRepository;

    @Value("${app.auth.jwt.redirect-url}")
    private String ACCESS_TOKEN_REDIRECT_URL;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        String refreshToken = jwtProvider.createRefreshToken(authentication);

        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
        User user = saveOrUpdateUser(refreshToken, oAuth2User);
        oAuth2User.setUserId(user.getId());

        ResponseCookie cookie = ResponseCookie.from("refresh", refreshToken)
                .httpOnly(true)
                .maxAge(JwtProvider.REFRESH_TOKEN_VALIDATE_TIME)
                .path("/")
                .build();

        response.addHeader("Set-Cookie", cookie.toString());

        String accessToken = jwtProvider.createAccessToken(authentication);
        log.info("{}'s accessToken: {}", oAuth2User.getNickname(), accessToken);

//        Map<String, String> data = new HashMap<>();
//        data.put("accessToken", accessToken);
//
//        response.getWriter()
//                .write(new ObjectMapper().writeValueAsString(responseService.getDataResponse(data)));

//        clearAuthenticationAttributes(request);
        String redirectUrl = ACCESS_TOKEN_REDIRECT_URL + accessToken;
        getRedirectStrategy().sendRedirect(request, response, redirectUrl);
    }

    private User saveOrUpdateUser(String refreshToken, CustomOAuth2User oAuth2User) {
        User user = userService.findByEmail(oAuth2User.getEmail());

        if (user != null) {
            userService.updateRefreshToken(user, refreshToken);
            return user;
        } else {
            Optional<LoginProvider> opt = loginProviderRepository.findByProvider(oAuth2User.getProvider());

            if (opt.isEmpty()) {
                throw new UnsupportedOAuthProviderException(oAuth2User.getProvider().name() + "은 지원하지 않는 로그인 방식입니다.");
            }

            user = User.builder()
                    .email(oAuth2User.getEmail())
                    .nickname(oAuth2User.getNickname())
                    .imagePath(oAuth2User.getProfileImagePath())
                    .refreshToken(refreshToken)
                    .loginProvider(opt.get())
                    .isDeleted(false)
                    .password("password")
                    .build();

            return userService.join(user);
        }
    }
}
