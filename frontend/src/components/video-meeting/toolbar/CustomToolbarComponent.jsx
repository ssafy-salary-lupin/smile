import React, { Component, useState } from "react";
import * as DuotonIcons from "components/common/DuotonIcons";
import styled from "styled-components";
import ExitMeeting from "components/video-meeting/toolbar/ExitMeeting";
// 툴바를 감싸주는 컨테이너
const ToolbarContainer = styled.div`
  display: flex;
  justify-content: space-around;
  height: 120px;
  width: 100vw;
  background-color: ${(props) => props.theme.videoRoomColor};
  position: absolute;
  bottom: 0;
  padding: 16px 35vw;
  z-index: 999999;
  /* min-width: 400px !important; */
`;

// 아이콘 외부의 동그라미
const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.889vw;
  height: 3.889vw;
  border-radius: 50px;
  cursor: pointer;
  /* background-color: #393e46; */
  background-color: ${(props) =>
    props.bgColor === undefined ? "#393e46" : props.bgColor};
`;

// 채팅 아이콘
const ChatIcon = styled.div`
  position: absolute;
  right: 32px;
  bottom: 32px;
  cursor: pointer;
`;

export default function CustomToolbarComponent(props) {
  const [fullscreen, setFullscreen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
    props.toggleFullscreen();
  };

  const leaveSession = () => {
    props.leaveSession();
  };

  const openModal = () => {
    setModalOpen(!modalOpen);
  };

  const toggleChat = () => {
    props.toggleChat();
  };

  const iconSize = "1.944vw";
  const iconColor = "#F5C82E";
  // const iconColor = "#061C3D";
  const iconborder = "2";
  const mySessionId = props.sessionId;
  const localUser = props.user;
  return (
    <ToolbarContainer id="toolbar">
      {/* 카메라 온 / 오프 */}
      {localUser !== undefined && localUser.isVideoActive() ? (
        <IconContainer onClick={props.camStatusChanged}>
          <DuotonIcons.VideoCamera
            width={iconSize}
            height={iconSize}
            fill="none"
            stroke={iconColor}
            strokeWidth="2"
          />
        </IconContainer>
      ) : (
        <IconContainer bgColor="#DD5353" onClick={props.camStatusChanged}>
          <DuotonIcons.VideoCameraSlash
            width={iconSize}
            height={iconSize}
            fill="none"
            stroke={iconColor}
            strokeWidth="2"
          />
        </IconContainer>
      )}

      {/* 화면 공유 온 / 오프 */}
      {localUser !== undefined && localUser.isScreenShareActive() ? (
        <IconContainer onClick={props.screenShare}>
          <DuotonIcons.PictureInPicture
            width={iconSize}
            height={iconSize}
            fill="none"
            stroke={iconColor}
            strokeWidth="2"
          />
        </IconContainer>
      ) : (
        <IconContainer onClick={props.screenShare}>
          <DuotonIcons.Laptop
            width={iconSize}
            height={iconSize}
            fill="none"
            stroke={iconColor}
            strokeWidth="2"
          />
        </IconContainer>
      )}

      {localUser !== undefined && localUser.isScreenShareActive() && (
        <IconContainer bgColor="#DD5353" onClick={props.stopScreenShare}>
          <DuotonIcons.LaptopX
            width={iconSize}
            height={iconSize}
            fill="none"
            stroke={iconColor}
            strokeWidth="2"
          />
        </IconContainer>
      )}

      {/* 마이크 온 / 오프   */}
      {localUser !== undefined && localUser.isAudioActive() ? (
        <IconContainer onClick={props.micStatusChanged}>
          <DuotonIcons.Microphone
            width={iconSize}
            height={iconSize}
            fill="none"
            stroke={iconColor}
            strokeWidth="2"
          />
        </IconContainer>
      ) : (
        <IconContainer bgColor="#DD5353" onClick={props.micStatusChanged}>
          <DuotonIcons.MicrophoneSlash
            width={iconSize}
            height={iconSize}
            fill="none"
            stroke={iconColor}
            strokeWidth="2"
          />
        </IconContainer>
      )}

      {/* 화상회의 종료 */}

      <IconContainer bgColor="#DD5353" onClick={openModal}>
        <DuotonIcons.PhoneX
          width={iconSize}
          height={iconSize}
          fill="none"
          stroke={iconColor}
          strokeWidth="2"
        ></DuotonIcons.PhoneX>
      </IconContainer>

      {/* 채팅 */}
      <ChatIcon onClick={toggleChat}>
        {props.showNotification && <div id="point" className="" />}
        <DuotonIcons.ChatCircleDots
          width="56px"
          height="56px"
          fill={iconColor}
          stroke="none"
          strokeWidth="2"
        />
      </ChatIcon>
      {modalOpen && (
        <ExitMeeting setModalOpen={setModalOpen} leaveSession={leaveSession} />
      )}
    </ToolbarContainer>
  );
}
