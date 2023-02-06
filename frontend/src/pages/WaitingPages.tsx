import styled from "styled-components";
import * as Icons from "../components/common/Icons";
import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";

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
  margin: 8vw 0vw 4vw 0vw;
  width: 479.995px;
  height: 270px;
`;

const BtnZip = styled.div`
  display: flex;
  justify-content: center;
  height: 100px;
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

function WaitingPages() {
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
        {isShowVideo === false && <Icon />}
      </Back>
      <BtnZip>
        {isShowVideo === false && (
          <Btn onClick={startCam}>
            <Icons.VideoCameraSlash />
          </Btn>
        )}

        {isShowVideo && (
          <Btn onClick={stopCam}>
            <Icons.VideoCamera />
          </Btn>
        )}
        {isMike === false && (
          <Btn onClick={MikeOn}>
            <Icons.MicrophoneSlash />
          </Btn>
        )}
        {isMike && (
          <Btn onClick={MikeOff}>
            <Icons.Microphone />
          </Btn>
        )}
        {isSpeaker !== true && (
          <Btn onClick={soundOff}>
            <Icons.SpeakerSimpleHigh />
          </Btn>
        )}
        {isSpeaker && (
          <Btn onClick={soundOn}>
            <Icons.SpeakerX />
          </Btn>
        )}
        <button>참여</button>
      </BtnZip>
    </Container>
  );
}
export default WaitingPages;
