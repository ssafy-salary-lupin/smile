package cp.smile.user.controller;

import cp.smile.auth.oauth2.CustomOAuth2User;
import cp.smile.config.response.CommonResponse;
import cp.smile.config.response.DataResponse;
import cp.smile.config.response.ResponseService;
import cp.smile.config.response.exception.CustomException;
import cp.smile.config.response.exception.CustomExceptionStatus;
import cp.smile.entity.user.User;
import cp.smile.entity.user.UserMemo;
import cp.smile.user.dto.request.MemoWriteDTO;
import cp.smile.user.dto.response.UserMemoDTO;
import cp.smile.user.repository.UserRepository;
import cp.smile.user.service.UserMemoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static cp.smile.config.response.CustomSuccessStatus.*;

@RestController
@RequiredArgsConstructor
public class UserMemoController {

    private final UserRepository userRepository;
    private final UserMemoService userMemoService;
    private final ResponseService responseService;

    @Tag(name="회원 메모 API")
    @Operation(summary = "등록한 메모 조회", description = "사용자가 저장해 둔 메모 목록을 조회")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API 정상 동작"),
            @ApiResponse(responseCode = "400",description = "API 에러")
    })
    @GetMapping("/users/{userId}/memos")
    public DataResponse<Map<String, List<UserMemoDTO>>> getAll(@AuthenticationPrincipal CustomOAuth2User oAuth2User) {
        List<UserMemo> memos = userMemoService.findByUserId(oAuth2User.getUserId());
        List<UserMemoDTO> list = memos.stream().map(UserMemoDTO::of).collect(Collectors.toList());

        Map<String, List<UserMemoDTO>> data = new HashMap<>();
        data.put("memos", list);

        return responseService.getDataResponse(data, memos.isEmpty() ? RESPONSE_NO_CONTENT : RESPONSE_SUCCESS);
    }

    @Tag(name="회원 메모 API")
    @Operation(summary = "메모 작성", description = "사용자가 메모를 작성하고 저장")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API 정상 동작"),
            @ApiResponse(responseCode = "400",description = "API 에러")
    })
    @PostMapping("/users/{userId}/memos")
    public CommonResponse write(@AuthenticationPrincipal CustomOAuth2User oAuth2User,
                                @RequestBody MemoWriteDTO dto) {
        User writer = getWriter(oAuth2User);
        userMemoService.write(writer, dto);
        return responseService.getSuccessResponse();
    }

    @Tag(name="회원 메모 API")
    @Operation(summary = "메모 수정", description = "사용자가 저장해둔 메모를 수정")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API 정상 동작"),
            @ApiResponse(responseCode = "400",description = "API 에러")
    })
    @PatchMapping("/users/{userId}/memos/{memoId}")
    public CommonResponse modify(@AuthenticationPrincipal CustomOAuth2User oAuth2User,
                                 @PathVariable int memoId,
                                 @RequestBody MemoWriteDTO dto) {
        User writer = getWriter(oAuth2User);
        userMemoService.update(writer, memoId, dto);
        return responseService.getSuccessResponse();
    }

    @Tag(name="회원 메모 API")
    @Operation(summary = "등록한 메모 삭제", description =  "사용자가 저장해 둔 메모 삭제")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API 정상 동작"),
            @ApiResponse(responseCode = "400",description = "API 에러")
    })
    @DeleteMapping("/users/{userId}/memos/{memoId}")
    public CommonResponse delete(@AuthenticationPrincipal CustomOAuth2User oAuth2User,
                                 @PathVariable int memoId) {
        User writer = getWriter(oAuth2User);
        userMemoService.delete(writer, memoId);
        return responseService.getSuccessResponse();
    }

    private User getWriter(CustomOAuth2User oAuth2User) {
        return userRepository.findById(oAuth2User.getUserId())
                .orElseThrow(() -> new CustomException(CustomExceptionStatus.ACCOUNT_NOT_FOUND));
    }
}
