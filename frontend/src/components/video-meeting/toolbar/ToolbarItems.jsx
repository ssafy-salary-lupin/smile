import * as DuotonIcons from "components/common/DuotonIcons";
import styled from "styled-components";

// 툴바를 감싸주는 컨테이너
export const ToolbarContainer = styled.div`
  display: flex;
  justify-content: space-around;
<<<<<<< HEAD
  height: 120px;
=======
  height: 15vh;
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
  width: 100vw;
  background-color: ${(props) => props.theme.videoRoomColor};
  position: absolute;
  bottom: 0;
<<<<<<< HEAD
  padding: 16px 35vw;
=======
  padding: 1.111vw 35vw;
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
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
<<<<<<< HEAD
  border-radius: 50px;
=======
  border-radius: 3.472vw;
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
  cursor: pointer;
  /* background-color: #393e46; */
  background-color: ${(props) =>
    props.bgColor === undefined ? "#393e46" : props.bgColor};
`;

// 채팅 아이콘
export const ChatIcon = styled.div`
  position: absolute;
<<<<<<< HEAD
  right: 32px;
  bottom: 32px;
=======
  right: 2.222vw;
  bottom: 2.222vw;
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
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
