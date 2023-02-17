import React, { Component, useState } from "react";
import * as ToolbarItems from "./ToolbarItems";

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

export default function ToolbarComponent(props) {
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
    <ToolbarItems.ToolbarContainer id="toolbar">
      {/* 카메라 온 / 오프 */}
      {localUser !== undefined && localUser.isVideoActive() ? (
        <ToolbarItems.VideoCamera
          onClick={props.camStatusChanged}
          width={iconSize}
          height={iconSize}
          fill="none"
          stroke={iconColor}
        />
      ) : (
        <ToolbarItems.VideoCameraX
          bgColor="#DD5353"
          onClick={props.camStatusChanged}
          width={iconSize}
          height={iconSize}
          fill="none"
          stroke={iconColor}
        />
      )}

      {/* 화면 공유 온 / 오프 */}
      {localUser !== undefined && localUser.isScreenShareActive() ? (
        <ToolbarItems.OtherScreenShare
          onClick={props.screenShare}
          width={iconSize}
          height={iconSize}
          fill="none"
          stroke={iconColor}
          strokeWidth="2"
        />
      ) : (
        <ToolbarItems.ScreenShare
          onClick={props.screenShare}
          width={iconSize}
          height={iconSize}
          fill="none"
          stroke={iconColor}
          strokeWidth="2"
        />
      )}

      {localUser !== undefined && localUser.isScreenShareActive() && (
        <ToolbarItems.ScreenShareX
          bgColor="#DD5353"
          onClick={props.stopScreenShare}
          width={iconSize}
          height={iconSize}
          fill="none"
          stroke={iconColor}
          strokeWidth="2"
        />
      )}

      {/* 마이크 온 / 오프   */}
      {localUser !== undefined && localUser.isAudioActive() ? (
        <ToolbarItems.Microphone
          onClick={props.micStatusChanged}
          width={iconSize}
          height={iconSize}
          fill="none"
          stroke={iconColor}
          strokeWidth="2"
        />
      ) : (
        <ToolbarItems.Microphone
          bgColor="#DD5353"
          onClick={props.micStatusChanged}
          width={iconSize}
          height={iconSize}
          fill="none"
          stroke={iconColor}
          strokeWidth="2"
        />
      )}

      {/* 화상회의 종료 */}

      <ToolbarItems.PhoneX
        bgColor="#DD5353"
        onClick={openModal}
        width={iconSize}
        height={iconSize}
        fill="none"
        stroke={iconColor}
        strokeWidth="2"
      />

      {/* 채팅 */}
      <ToolbarItems.Chat
        onClick={toggleChat}
        width="56px"
        height="56px"
        fill={iconColor}
        stroke="none"
        strokeWidth="2"
        showNotification={props.showNotification}
      />

      {modalOpen && (
        <ExitMeeting setModalOpen={setModalOpen} leaveSession={leaveSession} />
      )}
    </ToolbarItems.ToolbarContainer>
  );
}
