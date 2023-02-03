import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as StompJs from "@stomp/stompjs";

function CreateReadChat() {
  const [chatList, setChatList] = useState([]); // 화면에 표시괼 채팅 기록
  const [chat, setChat] = useState(""); // 입력되는 채팅

  const { apply_id } = useParams(); // 채널을 구분하는 식별자를 URL 파라미터로 받는다.
  const client = useRef({});

  const connect = () => {
    // 연결할 때
    console.log("connect 실행");
    client.current = new StompJs.Client({
      brokerURL: "ws://localhost:3000/ws",
      onConnect: () => {
        console.log("success");
        subscribe(); // 연결 성공 시 구독하는 로직 실행
      },
      debug: function (str) {
        console.log(str);
      },
    });
    client.current.activate(); // 클라이언트 활성화
  };

  const publish = (chat) => {
    if (!client.current.connected) return; // 연결되지 않았으면 메시지를 보내지 않는다.

    client.current.publish({
      destination: "/pub/chat",
      body: JSON.stringify({
        applyId: apply_id,
        chat: chat,
      }), // 형식에 맞게 수정해서 보내야 함.
    });

    setChat("");
  };

  const subscribe = () => {
    client.current.subscribe("/sub/chat/" + apply_id, (body) => {
      const json_body = JSON.parse(body.body);
      setChatList((_chat_list) => [..._chat_list, json_body]);
    });
  };

  const disconnect = () => {
    // 연결이 끊겼을 때
    client.current.deactivate();
  };

  const handleChange = (event) => {
    // 채팅 입력 시 state에 값 설정
    setChat(event.target.value);
  };

  const handleSubmit = (event, chat) => {
    // 보내기 버튼 눌렀을 때 publish
    event.preventDefault();

    publish(chat);
  };

  useEffect(() => {
    console.log("useEffect 실행");
    connect();

    return () => disconnect();
  }, []);

  return (
    <div>
      <div className={"chat-list"}>{chatList}</div>
      <form onSubmit={(event) => handleSubmit(event, chat)}>
        <div>
          <input
            type={"text"}
            name={"chatInput"}
            onChange={handleChange}
            value={chat}
          />
        </div>
        <input type={"submit"} value={"의견 보내기"} />
      </form>
    </div>
  );
}

export default CreateReadChat;
