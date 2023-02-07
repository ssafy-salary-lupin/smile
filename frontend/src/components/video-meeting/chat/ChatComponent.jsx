import React, { Component, useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import HighlightOff from "@mui/icons-material/HighlightOff";
import Send from "@mui/icons-material/Send";

import "./ChatComponent.css";
import { Tooltip } from "@mui/material";

export default function ChatComponent(props) {
  const [state, setState] = useState({
    messageList: [],
    message: "",
  });
  const [messageList, setMessageList] = useState([]);
  const [messageState, setMessageState] = useState("");
  const chatScroll = React.createRef();

  useEffect(() => {
    props.user.getStreamManager().stream.session.on("signal:chat", (event) => {
      const data = JSON.parse(event.data);
      let messageListTemp = messageList;
      messageListTemp.push({
        connectionId: event.from.connectionId,
        nickname: data.nickname,
        message: data.message,
      });
      // setMessageList((prev) => [
      //   ...prev,
      //   {
      //     connectionId: event.from.connectionId,
      //     nickname: data.nickname,
      //     message: data.message,
      //   },
      // ]);
      const document = window.document;
      setTimeout(() => {
        const userImg = document.getElementById(
          "userImg-" + (state.messageList.length - 1),
        );
        const video = document.getElementById("video-" + data.streamId);
        const avatar = userImg.getContext("2d");
        avatar.drawImage(video, 200, 120, 285, 285, 0, 0, 60, 60);
        props.messageReceived();
      }, 50);
      // setState({ messageList: messageList });
      setMessageList(messageListTemp);
      scrollToBottom();
    });
  }, []);

  const handleChange = (event) => {
    setState({ message: event.target.value });
  };

  const handlePressKey = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = () => {
    console.log(state.message);
    if (props.user && state.message) {
      let message = state.message.replace(/ +(?= )/g, "");
      if (message !== "" && message !== " ") {
        const data = {
          message: message,
          nickname: this.props.user.getNickname(),
          streamId: this.props.user.getStreamManager().stream.streamId,
        };
        props.user.getStreamManager().stream.session.signal({
          data: JSON.stringify(data),
          type: "chat",
        });
      }
    }
    setState({ message: "" });
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      try {
        chatScroll.current.scrollTop = chatScroll.current.scrollHeight;
      } catch (err) {}
    }, 20);
  };

  const close = () => {
    props.close(undefined);
  };

  const styleChat = { display: props.chatDisplay };
  return (
    <div id="chatContainer">
      <div id="chatComponent" style={styleChat}>
        <div id="chatToolbar">
          <span>
            {props.user.getStreamManager().stream.session.sessionId} - CHAT
          </span>
          <IconButton id="closeButton" onClick={close}>
            <HighlightOff color="secondary" />
          </IconButton>
        </div>
        <div className="message-wrap" ref={chatScroll}>
          {state.messageList.map((data, i) => (
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
            value={state.message}
            onChange={handleChange}
            onKeyPress={handlePressKey}
          />
          <Tooltip title="Send message">
            <Fab size="small" id="sendButton" onClick={sendMessage}>
              <Send />
            </Fab>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
