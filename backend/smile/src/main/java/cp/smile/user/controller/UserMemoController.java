package cp.smile.user.controller;

import cp.smile.auth.oauth2.CustomOAuth2User;
import cp.smile.config.response.CommonResponse;
import cp.smile.config.response.CustomSuccessStatus;
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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
        User writer = userRepository.findById(oAuth2User.getUserId())
                .orElseThrow(() -> new CustomException(CustomExceptionStatus.ACCOUNT_NOT_FOUND));

        userMemoService.write(writer, dto);

        return responseService.getSuccessResponse();
    }

}
