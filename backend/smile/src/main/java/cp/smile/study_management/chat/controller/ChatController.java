package cp.smile.study_management.chat.controller;

import cp.smile.auth.oauth2.CustomOAuth2User;
import cp.smile.config.response.CustomSuccessStatus;
import cp.smile.config.response.DataResponse;
import cp.smile.config.response.ResponseService;
import cp.smile.study_management.chat.dto.ChatMessageDTO;
import cp.smile.study_management.chat.dto.ChatRoomDTO;
import cp.smile.study_management.chat.dto.response.ChatMessageInfoDTO;
import cp.smile.study_management.chat.service.ChatService;
import cp.smile.study_management.chat.service.ChatServiceImpl;
import cp.smile.study_management.chat.service.RedisPublisher;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static cp.smile.config.response.CustomSuccessStatus.*;

@Slf4j
@RestController
@Tag(name = "스터디 실시간 채팅 API", description = "스터디 실시간 채팅 관련 API 모음")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;
    private final ResponseService responseService;
    private final RedisPublisher redisPublisher;

    //
    //스터디 아이디에 해당하는 모든 메시지 반환.
    @Tag(name="스터디 실시간 채팅 API")
    @Operation(summary = "스터디 채팅 메시지 조회 ", description =  "해당 스터디에서 발생한 메시지를 전부 반환해줌.")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "API 정상 동작"),
            @ApiResponse(responseCode = "400",description = "API 에러")
    })
    @GetMapping("/studies/{studyId}/chats")
    public DataResponse<List<ChatMessageInfoDTO>> findAllMessage(
            @PathVariable int studyId,
            @AuthenticationPrincipal CustomOAuth2User oAuth2User){

        int userId = oAuth2User.getUserId();

        List<ChatMessageInfoDTO> chatMessageInfoDTOS = chatService.findAllMessage(userId, studyId);

        if(chatMessageInfoDTOS.isEmpty()) return responseService.getDataResponse(chatMessageInfoDTOS,RESPONSE_NO_CONTENT);

        return responseService.getDataResponse(chatMessageInfoDTOS, RESPONSE_SUCCESS);
    }

    @GetMapping("/test/createRoom")
    public void test(){
        chatService.createRoom(1);
    }

    /* /pub/chat/message 로 들어오는 메시지 처리.*/
    @MessageMapping("/chat/message")
    public void message(ChatMessageDTO chatMessageDTO){

        if(ChatMessageDTO.MessageType.ENTER.equals(chatMessageDTO.getType())){

            chatService.enterChatRoom(chatMessageDTO.getRoomId());

            // TODO : SenderId는 식별자이므로 이름을 조회해와서 던져주는 로직이 필요하다.
            chatMessageDTO.setMessage(chatMessageDTO.getSenderId() + "님이 입장하셨습니다.");
        }

        //레디스로 데이터 발행.
        redisPublisher.publish(chatService.getTopic(chatMessageDTO.getRoomId()), chatMessageDTO);

//        messagingTemplate.convertAndSend("/sub/chat/room/" + chatMessageDTO.getRoomId(), chatMessageDTO);

    }

}
