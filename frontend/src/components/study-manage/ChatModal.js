import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Send } from "../../assets/icon/Send.svg";
import { useParams } from "react-router-dom";
import * as StompJs from "@stomp/stompjs";

const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
  position: fixed;
  width: 22.222vw;
  height: 31.667vw;
  z-index: 999;
  background-color: white;
  border-radius: 1.111vw;
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
  height: 10%;
  background-color: ${(props) => props.theme.mainColor};
  border-radius: 1.111vw 1.111vw 0 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.278vw 1.111vw;
`;

const HeaderText = styled.div`
  font-weight: 600;
  font-size: 1.111vw;
  justify-content: flex-start;
`;

const ModalContent = styled.div`
  width: 100%;
  height: 80%;
  background-color: ${(props) => props.theme.whiteColor};
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.278vw 1.111vw;
`;

const ChatList = styled.div``;

const ModalFooter = styled.form`
  width: 100%;
  height: 10%;
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
  width: 85%;
  border-radius: 1.111vw;
  border: none;
  background-color: #edebeb;
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

const SendBtn = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  background-color: ${(props) => props.theme.mainColor};
  display: flex;
  align-items: center;
  cursor: pointer;
`;

function ModalBasic(props) {
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
  });

  //,,,
  // 채팅
  const [chatList, setChatList] = useState([]); // 화면에 표시괼 채팅 기록
  const [chat, setChat] = useState(""); // 입력되는 채팅

  const { apply_id } = useParams(); // 채널을 구분하는 식별자를 URL 파라미터로 받는다. => 스터디 코드
  const client = useRef({});

  const connect = () => {
    // 연결할 때
    console.log("connect 실행");
    client.current = new StompJs.Client({
      brokerURL: "wss://i8b205.p.ssafy.io/be-api/ws-stomp",
      onConnect: () => {
        console.log("connect success");
        subscribe(); // 연결 성공 시 구독하는 로직 실행
      },
      debug: function (str) {
        console.log(str);
      },
    });
    client.current.activate(); // 클라이언트 활성화
  };

  const publish = (chat) => {
    console.log("publish client ", client);
    if (!client.current.connected) {
      console.log("publish : 클라이언트 연결 FAIL");
      return; // 연결되지 않았으면 메시지를 보내지 않는다.
    }

    console.log("publish : 클라이언트 연결 SUCCESS");
    // 메시지 보내기
    client.current.publish({
      destination: "/pub/chat/message",
      body: JSON.stringify({
        applyId: apply_id,
        chat: chat,
      }), // 형식에 맞게 수정해서 보내야 함.
    });

    setChat("");
  };

  // 메시지 받기 {우리 주소}/studies/{studyId}/chats
  const subscribe = () => {
    console.log("subcribe");
    client.current.subscribe("/sub/chat/room/" + apply_id, (body) => {
      const json_body = JSON.parse(body.body);
      setChatList((_chat_list) => [..._chat_list, json_body]);
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

  useEffect(() => {
    console.log("useEffect 실행 => connect");
    connect();

    return () => disconnect();
  }, []);

  return (
    <ModalContainer ref={modalRef}>
      <ModalHeader>
        <HeaderText>Message</HeaderText>
      </ModalHeader>
      <ModalContent>
        <ChatList>{chatList}</ChatList>
      </ModalContent>
      <ModalFooter onSubmit={(event) => handleSubmit(event, chat)}>
        <TextBox
          type={"text"}
          name={"chatInput"}
          onChange={handleChange}
          value={chat}
        ></TextBox>
        <SendMsgBox>
          <SendBtn type={"submit"}>
            {/* <Send width="100%" height="100%" /> */}
          </SendBtn>
        </SendMsgBox>
      </ModalFooter>
    </ModalContainer>
  );
}
export default ModalBasic;
