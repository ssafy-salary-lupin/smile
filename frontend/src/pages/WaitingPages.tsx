import styled from "styled-components";
import * as Icons from "../components/common/Icons";
import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import "../components/video-meeting/toolbar/CustomToolbarComponent.css";
import * as DuotonIcons from "components/common/DuotonIcons";
import ExitMeeting from "components/video-meeting/toolbar/ExitMeeting";

import IconButton from "@mui/material/IconButton";
import logo from "assets/img/smile_black.png";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: black;
  /* background-size: 100% 100%; */
  width: 100%;
  height: 100%;
`;

const Back = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #4d4949;
  /* margin: 8vw 0vw 4vw 0vw; */
  width: 479.995px;
  height: 270px;
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
  background-color: #393e46;
  /* background-color: ${(props: any) =>
    props.bgColor === undefined ? "#393e46" : props.bgColor}; */
`;
const IconContainerRed = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.889vw;
  height: 3.889vw;
  border-radius: 50px;
  cursor: pointer;
  background-color: #dd5353;
  /* background-color: ${(props: any) =>
    props.bgColor === undefined ? "#393e46" : props.bgColor}; */
`;

const BtnZip = styled.div`
  display: flex;
  justify-content: space-around;
  height: 120px;
  width: 100vw;
  padding: 16px 35vw;
`;

const Btn = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 0vw 1vw 1vw 1vw;
  background-color: #5f5f9d;
`;

const Icon = styled(Icons.Users)`
  width: 100px;
  height: 100px;
`;

function WaitingPages(props: any) {
  const [isShowVideo, setIsShowVideo] = useState<boolean>(true);
  const [isMike, setIsMike] = useState<boolean>(true);
  const [isSpeaker, setIsSpeaker] = useState<boolean>(false);
  // const isActivate = true;
  const videoElement = useRef<Webcam>(null);
  // const videoElement = useRef<Webcam>(null);

  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: "user",
  };

  const startCam = () => {
    setIsShowVideo(true);
  };

  const stopCam = () => {
    console.log(videoElement.current);
    if (videoElement.current !== null) {
      const stream = videoElement.current.stream;
      console.log("stream", stream);
      if (stream !== null) {
        const tracks = stream.getTracks();
        console.log("tracks", tracks);
        tracks.forEach((track: any) => track.stop());
        setIsShowVideo(false);
      }
    }
  };
  const MikeOn = () => {
    setIsMike(true);
  };
  const MikeOff = () => {
    console.log(videoElement.current);
    if (videoElement.current !== null) {
      const stream = videoElement.current.stream;
      if (stream !== null) {
        const audios = stream.getAudioTracks();
        audios.forEach((audio: any) => audio.stop());
        setIsMike(false);
      }
    } else if (videoElement.current === null) {
      setIsMike(false);
    }
  };

  const soundOff = () => {
    let audio = document.getElementById("muteSound") as HTMLMediaElement;
    audio.muted = true;
    setIsSpeaker(true);
    // console.log(audio);
  };
  const soundOn = () => {
    let audio = document.getElementById("muteSound") as HTMLMediaElement;
    audio.muted = false;
    setIsSpeaker(false);
    // console.log(audio);
  };
  const mySessionId = props.sessionId;
  const localUser = props.user;

  // const getUserCamera = () => {
  //   navigator.mediaDevices
  //     .getUserMedia({
  //       video: true,
  //     })
  //     .then((stream) => {
  //       //비디오 tag에 stream 추가
  //       if (videoElement.current !== null) {
  //         let video = videoElement.current.stream;
  //         console.log(video);
  //         if (video !== null) {
  //           video.srcObject = stream;

  //           video.play();
  //         }
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // useEffect(() => {
  //   getUserCamera();
  // }, [videoElement]);
  const [fullscreen, setFullscreen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const leaveSession = () => {
    props.leaveSession();
  };

  const openModal = () => {
    setModalOpen(!modalOpen);
  };

  const iconSize = "1.944vw";
  const iconColor = "#F5C82E";
  // const iconColor = "#061C3D";
  const iconborder = "2";
  return (
    <Container>
      <Back>
        {isShowVideo && (
          <Webcam
            id="muteSound"
            ref={videoElement}
            videoConstraints={videoConstraints}
            audio={true}
            mirrored={true}
            autoPlay
          />
        )}
      </Back>
      <BtnZip>
        {isShowVideo === false && (
          <IconContainerRed onClick={startCam}>
            <Icons.VideoCameraSlash
              width={iconSize}
              height={iconSize}
              fill="none"
              stroke={iconColor}
              strokeWidth="2"
            />
          </IconContainerRed>
        )}
        {isShowVideo && (
          <IconContainer onClick={stopCam}>
            <Icons.VideoCamera
              width={iconSize}
              height={iconSize}
              fill="none"
              stroke={iconColor}
              strokeWidth="2"
            />
          </IconContainer>
        )}
        {isMike === false && (
          <IconContainerRed onClick={MikeOn}>
            <Icons.MicrophoneSlash
              width={iconSize}
              height={iconSize}
              fill="none"
              stroke={iconColor}
              strokeWidth="2"
            />
          </IconContainerRed>
        )}
        {isMike && (
          <IconContainer onClick={MikeOff}>
            <Icons.Microphone
              width={iconSize}
              height={iconSize}
              fill="none"
              stroke={iconColor}
              strokeWidth="2"
            />
          </IconContainer>
        )}
        {/* {isSpeaker !== true && (
          <Btn onClick={soundOff}>
            <Icons.SpeakerSimpleHigh />
          </Btn>
        )}
        {isSpeaker && (
          <Btn onClick={soundOn}>
            <Icons.SpeakerX />
          </Btn>
        )} */}
        <IconContainerRed onClick={openModal}>
          <DuotonIcons.PhoneX
            width={iconSize}
            height={iconSize}
            fill="none"
            stroke={iconColor}
            strokeWidth="2"
          ></DuotonIcons.PhoneX>
        </IconContainerRed>
        <button>참여</button>
      </BtnZip>
      {modalOpen && (
        <ExitMeeting setModalOpen={setModalOpen} leaveSession={leaveSession} />
      )}
    </Container>
  );
}
export default WaitingPages;
