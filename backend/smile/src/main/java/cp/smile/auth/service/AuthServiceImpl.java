package cp.smile.auth.service;

import cp.smile.auth.jwt.JwtProvider;
import cp.smile.auth.oauth2.CustomOAuth2User;
import cp.smile.entity.user.User;
import cp.smile.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserService userService;
    private final JwtProvider jwtProvider;

    @Override
    public String reissueAccessToken(String oldAccessToken, String refreshToken) {
        if (!jwtProvider.validateToken(refreshToken)) {
            throw new RuntimeException("invalid refresh token");
        }

        Authentication authentication = jwtProvider.getAuthentication(oldAccessToken);
        String email = ((CustomOAuth2User) authentication.getPrincipal()).getEmail();

        log.info("access token reissue 대상: {}", email);

        User findUser = userService.findByEmail(email);

        /**
         * 유저가 존재하지 않을 경우 예외처리 추가
         */

        if (!refreshToken.equals(findUser.getRefreshToken())) {
            throw new RuntimeException("invalid refresh token");
        }

        return jwtProvider.createAccessToken(authentication);
    }
}
