package cp.smile.study_management.chat.controller;

import cp.smile.auth.oauth2.CustomOAuth2User;
import cp.smile.config.response.DataResponse;
import cp.smile.config.response.ResponseService;
import cp.smile.study_management.chat.dto.ChatMessageDTO;
import cp.smile.study_management.chat.dto.ChatRoomDTO;
import cp.smile.study_management.chat.dto.response.ChatMessageInfoDTO;
import cp.smile.study_management.chat.service.ChatService;
import cp.smile.study_management.chat.service.ChatServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;
    private final ResponseService responseService;

    private final SimpMessageSendingOperations messagingTemplate; //메시지를 도착지 까지 보내는 역할

    //스터디 아이디에 해당하는 모든 메시지 반환.
    @GetMapping("/studies/{studyId}/chats")
    public DataResponse<List<ChatMessageInfoDTO>> findAllMessage(
            @PathVariable int studyId,
            @AuthenticationPrincipal CustomOAuth2User oAuth2User){
        
        int userId = oAuth2User.getUserId();


        List<ChatMessageInfoDTO> chatMessageInfoDTOS = chatService.findAllMessage(userId, studyId);

        return responseService.getDataResponse(chatMessageInfoDTOS);
    }

    @MessageMapping("/chat/message")
    public void message(ChatMessageDTO chatMessageDTO){

        if(ChatMessageDTO.MessageType.ENTER.equals(chatMessageDTO.getType())){
            // TODO : SenderId는 식별자이므로 이름을 조회해와서 던져주는 로직이 필요하다.
            chatMessageDTO.setMessage(chatMessageDTO.getSenderId() + "님이 입장하셨습니다.");
        }

        messagingTemplate.convertAndSend("/sub/chat/room/" + chatMessageDTO.getRoomId(), chatMessageDTO);

    }

}
