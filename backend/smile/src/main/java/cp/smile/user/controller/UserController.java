
package cp.smile.user.controller;

import cp.smile.auth.oauth2.CustomOAuth2User;
import cp.smile.config.response.CommonResponse;
import cp.smile.config.response.DataResponse;
import cp.smile.config.response.ResponseService;
import cp.smile.user.dto.request.UserJoinDTO;
import cp.smile.user.dto.response.UserInfoDTO;
import cp.smile.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final ResponseService responseService;

    /**
     * 회원 가입
     */
    @PostMapping("/users")
    public CommonResponse join(@RequestBody UserJoinDTO userJoinDTO) {

        userService.join(userJoinDTO);

        return responseService.getSuccessResponse();
    }

    /**
     * 회원 조회
     */
    @GetMapping("/users/{userId}")
    public DataResponse<UserInfoDTO> findDetailUser(@PathVariable int userId) {

        return responseService.getDataResponse(userService.findDetailUser(userId));
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
}