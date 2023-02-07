package cp.smile.study_management.chat.service;


import com.fasterxml.jackson.databind.ObjectMapper;
import cp.smile.entity.study_management.ChatMessage;
import cp.smile.entity.user.UserJoinStudyId;
import cp.smile.study_management.chat.dto.ChatRoomDTO;
import cp.smile.study_management.chat.dto.response.ChatMessageInfoDTO;
import cp.smile.study_management.chat.repository.ChatMessageRepository;
import cp.smile.study_management.chat.repository.ChatRepository;
import cp.smile.study_management.chat.repository.ChatRepositoryImpl;
import cp.smile.user.repository.UserJoinStudyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatServiceImpl implements ChatService{

    private final ObjectMapper objectMapper;

    private final ChatMessageRepository chatMessageRepository;

    private final UserJoinStudyRepository userJoinStudyRepository;

    private final ChatRepository chatRepository;


    // 스터디 방은 UUID로 구분하는 것이 아닌, 스터디 식별자가 있기 때문에 이것으로 구분함.
    public void createRoom(int studyId){

        //TODO : 현재는 방DTO 객체를 생성하지만 스터디ID를 key로 해서, 레디스에 저장하도록 해야 됨.

        //TODO : 예외 처리 해야됨 - 가능하면 옵셔널로 처리.
        chatRepository.createChatRoom(studyId); //방 생성.
    }

    //스터디 아이디로 방 조회
    public ChatRoomDTO findRoomById(int studyId){

        // TODO : 현재는 스터디 식별자를 통해서 방정보 객체를 가져오지만 추후에 레디스로 교체해야됨.

        ChatRoomDTO chatRoomDTO = chatRepository
                .findChatRoomById(studyId)
                .orElseThrow(RuntimeException::new);
        return chatRoomDTO;
    }

    //메시지 전체 조회
    @Override
    public List<ChatMessageInfoDTO> findAllMessage(int userId, int studyId) {

        //현재 유저가 해당 스터디에 속한 유저가 맞는지 확인.
        UserJoinStudyId userJoinStudyId = UserJoinStudyId.builder()
                .userId(userId)
                .studyInformationId(studyId).build();


        //유저 정보와 스터디를 확인했을때 없다면 예외 던짐.
        userJoinStudyRepository
                .findById(userJoinStudyId)
                .orElseThrow(RuntimeException::new);

        /*채팅 메시지 조회*/
        List<ChatMessage> chatMessages = chatMessageRepository
                .findAllByChatMessages(studyId)
                .orElseThrow(RuntimeException::new);

        //조회한 데이터를 DTO로 변환.
        List<ChatMessageInfoDTO> chatMessageInfoDTOs = chatMessages.stream()
                .map(ChatMessage::createChatMessageInfoDTO)
                .collect(Collectors.toList());

        return chatMessageInfoDTOs;
    }

    public <T> void sendMessage(WebSocketSession session, T message){
        try {
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(message)));
        }
        catch(IOException e){
            log.error(e.getMessage(),e);
        }
    }
}
