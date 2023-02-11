import styled from "styled-components";
import * as Icons from "../components/common/Icons";
import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import "../components/video-meeting/toolbar/ToolbarComponent.css";
import * as DuotonIcons from "components/common/DuotonIcons";
import ExitMeeting from "components/video-meeting/toolbar/ExitMeeting";
import UserModel from "models/user-model";

import * as ToolbarItems from "components/video-meeting/toolbar/ToolbarItems";

import IconButton from "@mui/material/IconButton";
import logo from "assets/img/smile_black.png";
import { Link, useParams } from "react-router-dom";
import { StudySearchAll } from "apis/StudySearchApi";

let localUser = new UserModel();

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #222831;
  /* background-size: 100% 100%; */
  width: 100vw;
  height: 85vh;
`;

const StudyName = styled.div`
  margin-bottom: 5.556vw;
  span {
    color: white;
    font-size: 3.333vw;
    font-weight: 600;
  }
`;

const Back = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.25);
  /* margin: 8vw 0vw 4vw 0vw; */
  width: 50vw;
  height: 27.778vw;
  /* width: 479.995px;
  height: 270px; */
`;

const UserContainer = styled.div`
  width: 12.778vw;
  height: 12.778vw;
  background-color: ${(props) => props.theme.mainColor};
  border-radius: 6.944vw;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 2.5vw;
  }
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

const StartVideoMeeting = styled.button`
  width: 7.778vw;
  height: 3.889vw;
  background-color: #1d805f;
  border-radius: 3.472vw;
  border: none;
  cursor: pointer;
  :hover {
    background-color: #0f4130;
    span {
      color: #a1a1a1;
    }
  }
  span {
    font-size: 1.667vw;
    color: white;
  }
`;
function WaitingPages() {
  // TODO 스터디 이름 API로 받아오기
  // const [studyName, setStudyName] = useState<string>("");
  const params: paramsType = useParams();
  // useEffect(() => {
  //   getStudyInfo()

  //   return () => {
  //     console.log("스터디 입장");
  //   };
  // }, []);

  // const getStudyInfo = async () => {

  //   console.log("studyInfo:", studyInfo);
  //   setStudyName(studyInfo.);
  // };

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
  // const mySessionId = props.sessionId;
  // const localUser = props.user;

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
  // const leaveSession = () => {
  //   props.leaveSession();
  // };

  const iconSize = "1.944vw";
  const iconColor = "#F5C82E";
  // const iconColor = "#061C3D";
  const iconborder = "2";

  const camStatusChange = () => {
    console.log(localUser);
    localUser.setVideoActive(!localUser.isVideoActive());
    if (isShowVideo) {
      if (videoElement.current !== null) {
        const stream = videoElement.current.stream;
        if (stream !== null) {
          const tracks = stream.getTracks();
          tracks.forEach((track: any) => track.stop());
          setIsShowVideo(false);
        }
      }
    } else {
      setIsShowVideo(true);
    }
  };

  const micStatusChanged = () => {
    localUser.setAudioActive(!localUser.isAudioActive());
    if (isMike) {
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
    } else {
      setIsMike(true);
    }
  };

  const openModal = () => {
    setModalOpen(!modalOpen);
  };
  interface paramsType {
    studyId: string;
    userid: string;
  }

  return (
    <>
      <Container>
        <StudyName>
          {/* TODO 스터디 이름 받아오기*/}
          {/* <span>{studyInfo}</span> */}
          <span>SSAFY 스터디</span>
        </StudyName>
        <Back>
          {isShowVideo ? (
            <Webcam
              id="muteSound"
              ref={videoElement}
              videoConstraints={videoConstraints}
              audio={true}
              mirrored={true}
              autoPlay
            />
          ) : (
            <UserContainer>
              <span>이름</span>
            </UserContainer>
          )}
        </Back>
        {/* <BtnZip>
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
          )} */}
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
        {/* <IconContainerRed onClick={openModal}>
            <DuotonIcons.PhoneX
              width={iconSize}
              height={iconSize}
              fill="none"
              stroke={iconColor}
              strokeWidth="2"
            ></DuotonIcons.PhoneX>
          </IconContainerRed>
          <button>참여</button>
        </BtnZip> */}
        {/* {modalOpen && (
          <ExitMeeting
            setModalOpen={setModalOpen}
            leaveSession={leaveSession}
          />
        )} */}
      </Container>
      <ToolbarItems.ToolbarContainer>
        {/* 카메라 온 / 오프 */}
        {localUser !== undefined && localUser.isVideoActive() ? (
          <ToolbarItems.VideoCamera
            onClick={camStatusChange}
            width={iconSize}
            height={iconSize}
            fill="none"
            stroke={iconColor}
          />
        ) : (
          <ToolbarItems.VideoCameraX
            bgColor="#DD5353"
            onClick={camStatusChange}
            width={iconSize}
            height={iconSize}
            fill="none"
            stroke={iconColor}
          />
        )}

        {/* 마이크 온 / 오프   */}
        {localUser !== undefined && localUser.isAudioActive() ? (
          <ToolbarItems.Microphone
            onClick={micStatusChanged}
            width={iconSize}
            height={iconSize}
            fill="none"
            stroke={iconColor}
            strokeWidth="2"
          />
        ) : (
          <ToolbarItems.Microphone
            bgColor="#DD5353"
            onClick={micStatusChanged}
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
        {modalOpen && <ExitMeeting setModalOpen={setModalOpen} />}
        <Link to={{ pathname: `/videoMeeting/${params.studyId}` }}>
          <StartVideoMeeting>
            <span>참여</span>
          </StartVideoMeeting>
        </Link>
      </ToolbarItems.ToolbarContainer>
    </>
  );
}
export default WaitingPages;
