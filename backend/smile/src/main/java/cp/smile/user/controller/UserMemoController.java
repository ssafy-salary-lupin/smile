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

    @GetMapping("/users/{userId}/memos")
    public DataResponse<Map<String, List<UserMemoDTO>>> getAll(@AuthenticationPrincipal CustomOAuth2User oAuth2User) {
        List<UserMemo> memos = userMemoService.findByUserId(oAuth2User.getUserId());
        List<UserMemoDTO> list = memos.stream().map(UserMemoDTO::of).collect(Collectors.toList());

        Map<String, List<UserMemoDTO>> data = new HashMap<>();
        data.put("memos", list);

        return responseService.getDataResponse(data, memos.isEmpty() ? RESPONSE_NO_CONTENT : RESPONSE_SUCCESS);
    }

    @PostMapping("/users/{userId}/memos")
    public CommonResponse write(@AuthenticationPrincipal CustomOAuth2User oAuth2User,
                                @RequestBody MemoWriteDTO dto) {
        User writer = getWriter(oAuth2User);
        userMemoService.write(writer, dto);
        return responseService.getSuccessResponse();
    }

    @PatchMapping("/users/{userId}/memos/{memoId}")
    public CommonResponse modify(@AuthenticationPrincipal CustomOAuth2User oAuth2User,
                                 @PathVariable int memoId,
                                 @RequestBody MemoWriteDTO dto) {
        User writer = getWriter(oAuth2User);
        userMemoService.update(writer, memoId, dto);
        return responseService.getSuccessResponse();
    }

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
