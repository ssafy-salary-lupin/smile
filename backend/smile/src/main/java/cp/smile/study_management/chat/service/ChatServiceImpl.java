package cp.smile.study_management.chat.service;


import com.fasterxml.jackson.databind.ObjectMapper;
import cp.smile.entity.study_common.StudyComment;
import cp.smile.entity.study_common.StudyInformation;
import cp.smile.entity.study_management.ChatMessage;
import cp.smile.entity.user.UserJoinStudyId;
import cp.smile.study_common.repository.StudyCommentRepository;
import cp.smile.study_common.repository.StudyCommonRepository;
import cp.smile.study_management.chat.dto.ChatRoomDTO;
import cp.smile.study_management.chat.dto.response.ChatMessageInfoDTO;
import cp.smile.study_management.chat.repository.ChatMessageRepository;
import cp.smile.study_management.chat.repository.ChatRepository;
import cp.smile.study_management.chat.repository.ChatRepositoryImpl;
import cp.smile.user.repository.UserJoinStudyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
public class ChatServiceImpl implements ChatService{

    //스터디이름을 가져오기 위해서 디비 조회
    private final StudyCommonRepository studyCommonRepository;

    private final ObjectMapper objectMapper;

    private final ChatMessageRepository chatMessageRepository; //메시지 테이블 호출 레포 - RDB

    private final UserJoinStudyRepository userJoinStudyRepository;

    private final ChatRepository chatRepository; //레디스에 접근 레포


    // 스터디 방은 UUID로 구분하는 것이 아닌, 스터디 식별자가 있기 때문에 이것으로 구분함.
    @Override
    public void createRoom(int studyId){

        //TODO : 해당 서서비스 호출시점에 유저가 해당 스터디에 속하는게 맞는지, 스터디 장인지 확인하는 로직 필요.

        //스터디 id로 스터디 이름 조회 - 조회시에 없으면 종료.
        StudyInformation studyInformation = studyCommonRepository
                .findById(studyId)
                .orElseThrow(RuntimeException::new);

        //방 정보 객체 생성
        ChatRoomDTO chatRoomDTO = studyInformation.createChatRoomDTO();

        //방생성이 되었으면 레디스에 저장.
        chatRepository.saveChatRoom(chatRoomDTO);

    }

    //방 입장 - 방 입장시에 토픽을 생성하고 pub/sub 통신을 위해서 리스너를 설정함.
    @Override
    public void enterChatRoom(int studyId){

        //토픽 등, 레디스에서는 String을 사용하기 때문에, int를 string으로 바꿈.
        String roomId = String.valueOf(studyId);

        //채팅방 입장시, 토픽을 확인하고 없으면 생성
        if(chatRepository.findTopic(roomId).isPresent()){
            chatRepository.saveTopic(roomId);
        }
    }

    //스터디 아이디로 방 조회
    @Override
    public ChatRoomDTO findRoomById(int studyId){

        // TODO : 해당 스터디에 해당하는 사람이 맞는지 확인 로직 필요.
        //방을 조회 - 없다면 잘못된 조회이므로 예외 던짐.
        ChatRoomDTO chatRoomDTO = chatRepository
                .findChatRoomById(String.valueOf(studyId))
                .orElseThrow(RuntimeException::new);

        return chatRoomDTO;
    }

    //토픽 조회.
    @Override
    public ChannelTopic getTopic(int studyId){

        return chatRepository.findTopic(String.valueOf(studyId)).get();
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
