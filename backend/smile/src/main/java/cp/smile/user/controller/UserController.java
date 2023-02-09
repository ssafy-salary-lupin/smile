
package cp.smile.user.controller;

import cp.smile.auth.jwt.JwtProvider;
import cp.smile.auth.oauth2.CustomOAuth2User;
import cp.smile.config.response.CommonResponse;
import cp.smile.config.response.CustomSuccessStatus;
import cp.smile.config.response.DataResponse;
import cp.smile.config.response.ResponseService;
import cp.smile.config.response.exception.CustomException;
import cp.smile.entity.user.UserJoinStudy;
import cp.smile.user.dto.request.UserJoinDTO;
import cp.smile.user.dto.request.UserLoginDTO;
import cp.smile.user.dto.response.UserInfoDTO;
import cp.smile.user.dto.response.UserJoinedStudies;
import cp.smile.user.dto.response.UserTokenDTO;
import cp.smile.user.service.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static cp.smile.config.response.CustomSuccessStatus.*;

@Slf4j
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final ResponseService responseService;

    /* 회원 가입 */
    @PostMapping("/users")
    public CommonResponse join(@RequestBody UserJoinDTO userJoinDTO) {

        userService.join(userJoinDTO);

        return responseService.getSuccessResponse();
    }

    /* 회원 조회 */
    @GetMapping("/users/{userId}")
    public DataResponse<UserInfoDTO> findDetailUser(@PathVariable int userId) {

        return responseService.getDataResponse(userService.findDetailUser(userId), RESPONSE_SUCCESS);
    }

    /* 로그인 */
    @PostMapping("/log-in")
    public DataResponse<Map<String, String>> login(@RequestBody UserLoginDTO userLoginDTO, HttpServletResponse response) {

        String email = userLoginDTO.getEmail();
        String password = userLoginDTO.getPassword();

        UserTokenDTO userTokenDTO = userService.login(email, password);

        ResponseCookie cookie = ResponseCookie.from("refresh", userTokenDTO.getRefreshToken())
                .httpOnly(true)
                .maxAge(JwtProvider.REFRESH_TOKEN_VALIDATE_TIME)
                .path("/")
                .build();

        response.addHeader("Set-Cookie", cookie.toString());

        Map<String, String> accessToken = new HashMap<>();
        accessToken.put("accessToken", userTokenDTO.getAccessToken());

        return responseService.getDataResponse(accessToken, RESPONSE_SUCCESS);
    }

    /* 로그아웃 */
    @PostMapping("/log-out")
    public CommonResponse logout(@AuthenticationPrincipal CustomOAuth2User oAuth2User) {

        userService.logout(oAuth2User.getUserId());

        return responseService.getSuccessResponse();
    }

    @PostMapping("/users/{userId}/studies/{studyId}")
    public CommonResponse joinStudy(
            @PathVariable int userId,
            @PathVariable int studyId,
            @AuthenticationPrincipal CustomOAuth2User oAuth2User) {
        log.info("request user id: {}", oAuth2User.getUserId());
        userService.joinStudy(userId, studyId);
        return responseService.getSuccessResponse();
    }

    @GetMapping("/users/{userId}/studies")
    public DataResponse<UserJoinedStudies> findJoinStudies(@PathVariable int userId) {
        List<UserJoinStudy> studies = userService.findJoinStudies(userId);

        UserJoinedStudies userJoinedStudies = UserJoinedStudies.of(studies);

        return responseService.getDataResponse(userJoinedStudies, RESPONSE_SUCCESS);
    }
}