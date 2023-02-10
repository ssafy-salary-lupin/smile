import * as DuotonIcons from "components/common/DuotonIcons";
import styled from "styled-components";

// 툴바를 감싸주는 컨테이너
export const ToolbarContainer = styled.div`
  display: flex;
  justify-content: space-around;
  height: 8.333vw;
  width: 100vw;
  background-color: ${(props) => props.theme.videoRoomColor};
  position: absolute;
  bottom: 0;
  padding: 1.111vw 35vw;
  z-index: 999999;
  /* min-width: 400px !important; */
`;

// 아이콘 외부의 동그라미
export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.889vw;
  height: 3.889vw;
  border-radius: 3.472vw;
  cursor: pointer;
  /* background-color: #393e46; */
  background-color: ${(props) =>
    props.bgColor === undefined ? "#393e46" : props.bgColor};
`;

// 채팅 아이콘
export const ChatIcon = styled.div`
  position: absolute;
  right: 2.222vw;
  bottom: 2.222vw;
  cursor: pointer;
`;

export function VideoCamera(props) {
  return (
    <IconContainer onClick={props.onClick}>
      <DuotonIcons.VideoCamera
        width={props.width}
        height={props.height}
        fill={props.fill}
        stroke={props.stroke}
        strokeWidth="2"
      />
    </IconContainer>
  );
}

export function VideoCameraX(props) {
  return (
    <IconContainer bgColor={props.bgColor} onClick={props.onClick}>
      <DuotonIcons.VideoCameraSlash
        width={props.width}
        height={props.height}
        fill={props.fill}
        stroke={props.stroke}
        strokeWidth="2"
      />
    </IconContainer>
  );
}

export function ScreenShare(props) {
  return (
    <IconContainer bgColor={props.bgColor} onClick={props.onClick}>
      <DuotonIcons.Laptop
        width={props.width}
        height={props.height}
        fill={props.fill}
        stroke={props.stroke}
        strokeWidth="2"
      />
    </IconContainer>
  );
}

export function OtherScreenShare(props) {
  return (
    <IconContainer bgColor={props.bgColor} onClick={props.onClick}>
      <DuotonIcons.PictureInPicture
        width={props.width}
        height={props.height}
        fill={props.fill}
        stroke={props.stroke}
        strokeWidth="2"
      />
    </IconContainer>
  );
}

export function ScreenShareX(props) {
  return (
    <IconContainer bgColor={props.bgColor} onClick={props.onClick}>
      <DuotonIcons.LaptopX
        width={props.width}
        height={props.height}
        fill={props.fill}
        stroke={props.stroke}
        strokeWidth="2"
      />
    </IconContainer>
  );
}

export function Microphone(props) {
  return (
    <IconContainer bgColor={props.bgColor} onClick={props.onClick}>
      <DuotonIcons.Microphone
        width={props.width}
        height={props.height}
        fill={props.fill}
        stroke={props.stroke}
        strokeWidth="2"
      />
    </IconContainer>
  );
}

export function MicrophoneX(props) {
  return (
    <IconContainer bgColor={props.bgColor} onClick={props.onClick}>
      <DuotonIcons.MicrophoneSlash
        width={props.width}
        height={props.height}
        fill={props.fill}
        stroke={props.stroke}
        strokeWidth="2"
      />
    </IconContainer>
  );
}

export function PhoneX(props) {
  return (
    <IconContainer bgColor={props.bgColor} onClick={props.onClick}>
      <DuotonIcons.PhoneX
        width={props.width}
        height={props.height}
        fill={props.fill}
        stroke={props.stroke}
        strokeWidth="2"
      />
    </IconContainer>
  );
}

export function Chat(props) {
  return (
    <ChatIcon onClick={props.onClick}>
      {props.showNotification && <div id="point" className="" />}
      <DuotonIcons.ChatCircleDots
        width={props.width}
        height={props.height}
        fill={props.fill}
        stroke={props.stroke}
        strokeWidth="2"
      />
    </ChatIcon>
  );
}
