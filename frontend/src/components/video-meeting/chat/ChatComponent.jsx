import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import HighlightOff from "@mui/icons-material/HighlightOff";
import Send from "@mui/icons-material/Send";

import "./ChatComponent.css";
import { Tooltip } from "@mui/material";
import styled from "styled-components";

import * as DuotonIcons from "components/common/DuotonIcons";
import * as Icons from "components/common/Icons";

const ChatContainer = styled.div`
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100%;
`;

const ChatSubContainer = styled.div`
  background-color: #b8b8b8;
  position: absolute;
  z-index: 99999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  height: calc(100% - 30px);
  width: calc(100% - 30px);
  border-radius: 20px;
  ${(props) => props.styleChat}
`;

const ChatToolbar = styled.div`
  height: 30px;
  background-color: #3d3d3d;
  box-sizing: border-box;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  padding-top: 4px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  color: #ffffff;
`;

const IconContainer = styled.div`
  position: absolute;
  right: 0;
  top: -8px;
`;

export default function ChatComponent(props) {
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  const chatScroll = React.createRef();

  const scrollToBottom = () => {
    setTimeout(() => {
      try {
        chatScroll.current.scrollTop = chatScroll.current.scrollHeight;
        console.log(chatScroll.cuttent.scrollTop);
      } catch (err) {}
    }, 20);
  };

  useEffect(() => {
    props.user.getStreamManager().stream.session.on("signal:chat", (event) => {
      const data = JSON.parse(event.data);
      // let messageListTemp = messageList;
      // messageListTemp.push({
      //   connectionId: event.from.connectionId,
      //   nickname: data.nickname,
      //   message: data.message,
      // });

      const document = window.document;
      const userImg = undefined;
      // setTimeout(() => {
      //   const userImg = document.getElementById(
      //     "userImg-" + (messageList.length - 1),
      //   );
      //   const video = document.getElementById("video-" + data.streamId);
      //   console.log(userImg.getContest("2d"));
      //   const avatar = userImg.getContext("2d");
      //   avatar.drawImage(video, 200, 120, 285, 285, 0, 0, 60, 60);
      //   props.messageReceived();
      // }, 50);
      // setState({ messageList: messageList });
      // setMessageList(messageListTemp);
      setMessageList((prev) => [
        ...prev,
        {
          connectionId: event.from.connectionId,
          nickname: data.nickname,
          message: data.message,
        },
      ]);
      scrollToBottom();
    });
  }, []);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = () => {
    console.log(message);
    if (props.user && message) {
      let messageTemp = message.replace(/ +(?= )/g, "");
      if (messageTemp !== "" && messageTemp !== " ") {
        const data = {
          message: messageTemp,
          nickname: props.user.getNickname(),
          streamId: props.user.getStreamManager().stream.streamId,
        };
        props.user.getStreamManager().stream.session.signal({
          data: JSON.stringify(data),
          type: "chat",
        });
      }
    }
    setMessage("");
  };

  const handlePressKey = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const close = () => {
    props.close(undefined);
  };

  const styleChat = { display: props.chatDisplay };
  return (
    <ChatContainer>
      <ChatSubContainer styleChat={styleChat}>
        <ChatToolbar>
          <span>
            {props.user.getStreamManager().stream.session.sessionId} - CHAT
          </span>
          <IconContainer>
            <Icons.Close onClick={close} />
          </IconContainer>
          <IconButton id="closeButton" onClick={close}>
            <HighlightOff color="secondary" />
          </IconButton>
        </ChatToolbar>
        <div className="message-wrap" ref={chatScroll}>
          {messageList.map((data, i) => (
            <div
              key={i}
              id="remoteUsers"
              className={
                "message" +
                (data.connectionId !== props.user.getConnectionId()
                  ? " left"
                  : " right")
              }
            >
              <canvas
                id={"userImg-" + i}
                width="60"
                height="60"
                className="user-img"
              />
              <div className="msg-detail">
                <div className="msg-info">
                  <p> {data.nickname}</p>
                </div>
                <div className="msg-content">
                  <span className="triangle" />
                  <p className="text">{data.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div id="messageInput">
          <input
            placeholder="Send a messge"
            id="chatInput"
            value={message}
            onChange={handleChange}
            onKeyPress={handlePressKey}
          />
          <Tooltip title="Send message">
            <Fab size="small" id="sendButton" onClick={sendMessage}>
              <Send />
            </Fab>
          </Tooltip>
        </div>
      </ChatSubContainer>
    </ChatContainer>
  );
}
