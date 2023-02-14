
package cp.smile.user.controller;

import cp.smile.auth.jwt.JwtProvider;
import cp.smile.auth.oauth2.CustomOAuth2User;
import cp.smile.config.response.CommonResponse;
import cp.smile.config.response.DataResponse;
import cp.smile.config.response.ResponseService;
import cp.smile.config.response.exception.CustomException;
import cp.smile.entity.user.UserJoinStudy;
import cp.smile.user.dto.request.UserJoinDTO;
import cp.smile.user.dto.request.UserLoginDTO;
import cp.smile.user.dto.request.UserUpdateDTO;
import cp.smile.user.dto.response.UserInfoDTO;
import cp.smile.user.dto.response.UserJoinedStudies;
import cp.smile.user.dto.response.UserTokenDTO;
import cp.smile.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static cp.smile.config.response.CustomSuccessStatus.*;
import static cp.smile.config.response.exception.CustomExceptionStatus.ACCOUNT_NOT_VALID;

@Slf4j
@RestController
@Tag(name = "회원 API", description = "회원 관련 API - 로그인, 회원가입 등")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final ResponseService responseService;

    @Tag(name="회원 API")
    /* 회원 가입 */
    @Operation(summary = "회원가입", description =  "회원정보를 입력하여 가입함.")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API 정상 동작"),
            @ApiResponse(responseCode = "400",description = "API 에러")
    })
    @PostMapping("/users")
    public CommonResponse join(@RequestBody UserJoinDTO userJoinDTO) {

        userService.join(userJoinDTO);

        return responseService.getSuccessResponse();
    }

    /* 회원 정보 조회 */
    @Tag(name="회원 API")
    @Operation(summary = "회원 정보 조회", description =  "특정 회원의 정보를 조회 - 이름,프로필 사진등")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API 정상 동작"),
            @ApiResponse(responseCode = "400",description = "API 에러")
    })
    @GetMapping("/users/{userId}")
    public DataResponse<UserInfoDTO> findDetailUser(@PathVariable int userId) {

        return responseService.getDataResponse(userService.findDetailUser(userId), RESPONSE_SUCCESS);
    }

    /* 회원 정보 수정 */
    @Tag(name="회원 API")
    @Operation(summary = "회원 정보 수정", description =  "회원 정보를 입력받아 기존 정보를 수정함.")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API 정상 동작"),
            @ApiResponse(responseCode = "400",description = "API 에러")
    })
    @PatchMapping(value = "/users/{userId}", consumes = {"multipart/form-data"})
    public CommonResponse updateUserInfo(
            @PathVariable int userId,
            @RequestPart("data") UserUpdateDTO userUpdateDTO,
            @RequestPart(value = "file",required = false) MultipartFile multipartFile,
            @AuthenticationPrincipal CustomOAuth2User oAuth2User) {

        int oAuthUserId = oAuth2User.getUserId();

        if (userId != oAuthUserId) {
            throw new CustomException(ACCOUNT_NOT_VALID);
        }

        userService.updateUserInfo(userId, userUpdateDTO, multipartFile);

        return responseService.getSuccessResponse();
    }

    /* 회원 탈퇴 */
    @Tag(name="회원 API")
    @Operation(summary = "회원 탈퇴", description =  "회원 테이블의 삭제 체크 변수를 true 바꿔서 삭제 처리함.")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API 정상 동작"),
            @ApiResponse(responseCode = "400",description = "API 에러")
    })
    @PatchMapping("/users/{userId}/delete")
    public CommonResponse deleteUser(
            @PathVariable int userId,
            @AuthenticationPrincipal CustomOAuth2User oAuth2User) {

        int oAuthUserId = oAuth2User.getUserId();

        if (userId != oAuthUserId) {
            throw new CustomException(ACCOUNT_NOT_VALID);
        }

        userService.deleteUser(userId);

        return responseService.getSuccessResponse();
    }

    /* 로그인 */
    @Tag(name="회원 API")
    @Operation(summary = "자체 로그인", description =  "자체 서비스에서 만든 로그인, 이메일과 비밀번호를 받아서 로그인하고 토큰을 반환함.")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API 정상 동작"),
            @ApiResponse(responseCode = "400",description = "API 에러")
    })
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
    @Tag(name="회원 API")
    @Operation(summary = "로그아웃", description =  "저장된 토큰을 만료시켜서 로그아웃 구현")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API 정상 동작"),
            @ApiResponse(responseCode = "400",description = "API 에러")
    })
    @PostMapping("/log-out")
    public CommonResponse logout(@AuthenticationPrincipal CustomOAuth2User oAuth2User) {

        userService.logout(oAuth2User.getUserId());

        return responseService.getSuccessResponse();
    }

    @Tag(name="회원 API")
    @Operation(summary = "스터디 가입", description =  "해당 스터디에 가입요청을 함.")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API 정상 동작"),
            @ApiResponse(responseCode = "400",description = "API 에러")
    })
    @PostMapping("/users/{userId}/studies/{studyId}")
    public CommonResponse joinStudy(
            @PathVariable int userId,
            @PathVariable int studyId,
            @AuthenticationPrincipal CustomOAuth2User oAuth2User) {
        log.info("request user id: {}", oAuth2User.getUserId());
        userService.joinStudy(userId, studyId);
        return responseService.getSuccessResponse();
    }

    @Tag(name="회원 API")
    @Operation(summary = "가입한 스터디 목록 조회", description =  "해당 유저가 가입한 스터디정보 목록을 반환해줌.")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API 정상 동작"),
            @ApiResponse(responseCode = "400",description = "API 에러")
    })
    @GetMapping("/users/{userId}/studies")
    public DataResponse<UserJoinedStudies> findJoinStudies(@PathVariable int userId) {
        List<UserJoinStudy> studies = userService.findJoinStudies(userId);

        UserJoinedStudies userJoinedStudies = UserJoinedStudies.of(studies);

        return responseService.getDataResponse(userJoinedStudies, RESPONSE_SUCCESS);
    }

    @Tag(name="회원 API")
    @Operation(summary = "스터디 탈퇴", description =  "해당 유저가 가입한 스터디를 탈퇴")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API 정상 동작"),
            @ApiResponse(responseCode = "400",description = "API 에러")
    })
    @DeleteMapping("/users/{userId}/studies/{studyId}")
    public CommonResponse leaveStudy(@AuthenticationPrincipal CustomOAuth2User oAuth2User,
                                     @PathVariable int studyId) {
        userService.leaveStudy(oAuth2User.getUserId(), studyId);
        return responseService.getSuccessResponse();
    }
}