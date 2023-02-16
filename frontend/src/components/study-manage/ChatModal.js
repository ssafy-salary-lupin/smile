import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Send } from "../../assets/icon/Send.svg";
import { useParams } from "react-router-dom";
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import { useRecoilValue } from "recoil";
import { studyIdRecoil } from "atoms/StudyManage";
import jwt_decode from "jwt-decode";
import { isError, useQuery } from "react-query";
import sendImg from "../../assets/img/SendImg.png";
import { UserIdState } from "atoms/UserInfoAtom";
import { ChatSelectAllApi } from "apis/StudyManageMainApi";

const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
  position: fixed;
  width: 22.222vw;
  height: 33.333vw;
  z-index: 999;
  background-color: white;
  border-radius: 0.694vw;
  position: absolute;
  right: 3.889vw;
  top: 40.556vw;
  transform: translate(-50%, -50%);
  border: 0.994px solid ${(props) => props.theme.blackColorOpacity3};
  box-shadow: 4.997px 4.997px 4.997px
    ${(props) => props.theme.blackColorOpacity};
`;

const ModalHeader = styled.div`
  width: 100%;
  height: 8%;
  background-color: rgb(245, 245, 245);
  border-bottom: 1px solid rgb(160, 164, 167);
  border-radius: 0.694vw 0.694vw 0 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0.278vw 1.111vw;
`;

const HeaderText = styled.div`
  width: 100%;
  /* font-weight: 600; */
  color: ${(props) => props.theme.blackColorOpacity2};
  font-size: 1.111vw;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  text-align: center;
  p {
    margin: 0;
  }
`;

const ModalContent = styled.div`
  width: 100%;
  height: 84%;
  background-color: rgb(245, 245, 245);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* align-items: center; */
  padding: 0.278vw 1.111vw;
  overflow-y: scroll;
`;

const ChatList = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const EnterMsgBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* border: 0.994px solid red; */
  justify-content: center;
  width: 100%;
  padding: 0.556vw;

  div {
    /* background-color: ${(props) => props.theme.blackColorOpacity3}; */
    width: 100%;
    text-align: center;
    border-radius: 3.472vw;
    padding: 0.556vw 0;
    font-size: 0.694vw;
  }
`;

const ChatBubbleWrapperMe = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 0.972vw;
  /* align-items: right; */
`;

const ChatBubbleWrapperYou = styled(ChatBubbleWrapperMe)`
  justify-content: flex-start;
  align-items: left;
`;

const NameMe = styled.div`
  width: 100%;
  font-size: 0.833vw;
  margin-bottom: 0.278vw;
  text-align: right;
  padding-right: 0.556vw;
  color: ${(props) => props.theme.blackColorOpacity2};
`;

const NameYou = styled(NameMe)`
  text-align: left;
  padding-right: 0;
  padding-left: 0.556vw;
`;

const ChatBubbleMe = styled.div`
  max-width: 12.778vw;
  min-width: 6.944vw;
  position: relative;
  background: rgb(52, 135, 235);
  color: white;
  line-height: 1.111vw;
  padding: 0.556vw;
  border-radius: 0.694vw;
  display: flex;
  align-items: center;
  justify-content: center;
  word-wrap: break-word;
  box-shadow: 0.208vw 0.208vw 0.208vw
    ${(props) => props.theme.blackColorOpacity};

  p {
    margin: 0;
    font-size: 0.833vw;
  }
`;

const ChatBubbleYou = styled(ChatBubbleMe)`
  background: rgb(232, 233, 234);
  color: ${(props) => props.theme.blackColorOpacity2};
`;

const ModalFooter = styled.form`
  background-color: rgb(245, 245, 245);
  border-top: 1px solid rgb(160, 164, 167);
  border-radius: 0 0 0.694vw 0.694vw;
  width: 100%;
  height: 8%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.278vw 1.111vw;
  justify-content: space-around;
  /* background-color: red; */
  padding: 0.556vw 1.111vw;
  /* border-top: 0.994px solid ${(props) => props.theme.blackColorOpacity}; */
`;

const TextBox = styled.input`
  width: 100%;
  border-radius: 1.111vw;
  border: none;
  /* border: 0.139vw solid #c1cdea; */
  background-color: transparent;
  height: 100%;
  outline: none;
  font-size: 0.556vw;
  padding: 0 0.556vw;
`;

const SendMsgBox = styled.div`
  width: 15%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const SendBtn = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  font-weight: bold;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

function ChatModal(props) {
  const [modalBasicClose, setModalBasicClose] = useState(true);
  // 모달 끄기
  const closeModal = () => {
    console.log("before : ", props.setModalOpen);
    props.setModalOpen(false);
  };
  const modalRef = useRef(null);
  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = (event) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        props.setModalOpen(false);
      }
    };

    // 이벤트 핸들러 등록
    document.addEventListener("mousedown", handler);
    // document.addEventListener('touchstart', handler); // 모바일 대응

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener("mousedown", handler);
      // document.removeEventListener('touchstart', handler); // 모바일 대응
    };
  }, []);

  // const { apply_id } = useParams(); // 채널을 구분하는 식별자를 URL 파라미터로 받는다. => 스터디 코드
  const client = useRef({});

  // type : ENTER , TALK
  const [typeValue, setTypeValue] = useState("ENTER");

  // roomId : studyId
  const studyId = useRecoilValue(studyIdRecoil);

  // senderId : token userId 추출
  const userId = useRecoilValue(UserIdState);

  // message : chat
  const [chatList, setChatList] = useState([]); // 화면에 표시괼 채팅 기록
  const [chat, setChat] = useState(""); // 입력되는 채팅

  // 최초 입장시 Enter type 보내기위해 임시 설정
  const [firstEnter, setFirstEnter] = useState(true);

  const { data: chatInfo } = useQuery("chatSelectAllApi", () =>
    ChatSelectAllApi(studyId),
  );

  useEffect(() => {
    console.log("채팅 내역 : ", chatInfo);
  });

  useEffect(() => {
    async function setChatFunc() {
      await setChatList((_chat_list) => [..._chat_list, props.chatInfo]);
    }

    setChatFunc();

    console.log("set chat : ", chat);

    connect();

    return () => disconnect();
  }, []);

  const connect = () => {
    // 연결할 때
    client.current = new StompJs.Client({
      // brokerURL: "ws://i8b205.p.ssafy.io/be-api/ws-stomp",
      webSocketFactory: () =>
        new SockJS("https://i8b205.p.ssafy.io/be-api/ws-stomp"), // proxy를 통한 접속
      onConnect: () => {
        console.log("connect success");
        subscribe(); // 연결 성공 시 구독하는 로직 실행

        // 최초 입장시 ENTER Type 보내기 위해 설정
        if (firstEnter) {
          publish();
          setFirstEnter(false);
          setTypeValue("TALK");
        }
      },
      debug: function (str) {
        console.log("debug : ", str);
      },
    });
    client.current.activate(); // 클라이언트 활성화
  };

  const publish = (chat) => {
    if (!client.current.connected) {
      console.log("publish : 클라이언트 연결 FAIL");
      return; // 연결되지 않았으면 메시지를 보내지 않는다.
    }

    // 메시지 보내기
    client.current.publish({
      destination: "/pub/chat/message",
      body: JSON.stringify({
        type: typeValue, //먼저 방에 들어올때 - ENTER,  메시지를 보낼떄 - TALK
        roomId: studyId, //스터디 ID
        senderId: userId, //유저 id
        senderName: props.nickName, // nickName, //유저 이름
        message: chat, //메시지
      }), // 형식에 맞게 수정해서 보내야 함.
    });

    setChat("");
  };

  // 메시지 받기 {우리 주소}/studies/{studyId}/chats
  const subscribe = () => {
    console.log("subscribe");
    // client.current.subscribe("/sub/chat/room/" + apply_id, (body) => {
    client.current.subscribe(`/sub/chat/room/${studyId}`, async (body) => {
      const json_body = JSON.parse(body.body);
      // console.log("json_body : ", json_body);
      await setChatList((_chat_list) => [..._chat_list, json_body]);
    });
  };

  const disconnect = () => {
    // 연결이 끊겼을 때
    console.log("disconnect!!!");
    client.current.deactivate();
  };

  const handleChange = (event) => {
    // 채팅 입력 시 state에 값 설정
    setChat(event.target.value);
  };

  const handleSubmit = (event, chat) => {
    // 보내기 버튼 눌렀을 때 publish
    event.preventDefault(); // form 제출 막기
    publish(chat);
  };

  console.log("chatList : ", chatList);

  return (
    <ModalContainer ref={modalRef}>
      <ModalHeader>
        <HeaderText>
          <p>Message</p>
        </HeaderText>
      </ModalHeader>
      <ModalContent>
        <ChatList>
          {chatList?.map((el, index) => {
            if (el.type === "ENTER") {
              return (
                <EnterMsgBox key={index}>
                  <div>{el.message}</div>
                  {/* <div>{el.senderName}</div> */}
                </EnterMsgBox>
              );
            } else {
              // el.userProfile.id === userId ||
              if (el.senderId === userId) {
                return (
                  <ChatBubbleWrapperMe>
                    {/* 내 채팅이 보여질 구간 */}
                    <div>
                      <NameMe>{el.senderName}</NameMe>
                      <ChatBubbleMe>
                        <p>{el.message}</p>
                      </ChatBubbleMe>
                    </div>
                  </ChatBubbleWrapperMe>
                );
              } else {
                return (
                  <ChatBubbleWrapperYou>
                    {/* 상대방 채팅이 보여질 구간 */}
                    <div>
                      <NameYou>{el.senderName}</NameYou>
                      <ChatBubbleYou>
                        <p>{el.message}</p>
                      </ChatBubbleYou>
                    </div>
                  </ChatBubbleWrapperYou>
                );
              }
            }
          })}
          {/* <EnterMsgBox>
            <div>정혜주님이 입장하셨습니다. </div>
          </EnterMsgBox>
          <ChatBubbleWrapperMe>
            <div>
              <NameMe>정혜주</NameMe>
              <ChatBubbleMe>
                <p>
                  안녕하세요? 반갑습니다. 저는 정혜주입니다. 앞으로 잘
                  부탁드립니다.
                </p>
              </ChatBubbleMe>
            </div>
          </ChatBubbleWrapperMe>
          <ChatBubbleWrapperYou>
            <div>
              <NameYou>정혜주</NameYou>
              <ChatBubbleYou>
                <p>
                  안녕하세요? 반갑습니다. 저는 정혜주입니다. 앞으로 잘
                  부탁드립니다.
                </p>
              </ChatBubbleYou>
            </div>
          </ChatBubbleWrapperYou> */}
        </ChatList>
      </ModalContent>
      <ModalFooter onSubmit={(event) => handleSubmit(event, chat)}>
        <TextBox
          type={"text"}
          name={"chatInput"}
          onChange={handleChange}
          value={chat}
          placeholder="메시지를 입력하세요."
          autoComplete="off"
        ></TextBox>
        <SendMsgBox>
          <SendBtn type={"submit"} value={"Send"}>
            <Send width="100%" height="100%" stroke="#000000ae" />
          </SendBtn>
        </SendMsgBox>
      </ModalFooter>
    </ModalContainer>
  );
}
export default ChatModal;
