import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Webcam from "react-webcam";
import styled from "styled-components";
import VideoRoomComponent from "components/video-meeting/VideoRoomComponent";
import ExitMeeting from "components/video-meeting/toolbar/ExitMeeting";
import * as ToolbarItems from "components/video-meeting/toolbar/ToolbarItems";
import UserModel from "models/user-model";
import { useRecoilState, useRecoilValue } from "recoil";
import { UserIdState } from "atoms/UserInfoAtom";
import { useQuery } from "react-query";
import { InfoApi } from "apis/UserInfoApi";
import { PageState } from "atoms/PageAtom";

// TODO : 대기 화면

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

// TODO : 대기 화면
interface paramsType {
  studyId: string;
}

function VideoMeetingPages() {
  const [isMeetingStart, setIsMeetingStart] = useState<boolean>(false);
  const [isShowVideo, setIsShowVideo] = useState<boolean>(true);
  const [isMike, setIsMike] = useState<boolean>(true);
  const videoElement = useRef<Webcam>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const userId = useRecoilValue(UserIdState);

  interface userDataType {
    data: {
      isSuccess: boolean;
      code: number;
      message: string;
      result: {
        id: number;
        nickname: string;
        email: string;
        imagePath: string;
        deleted: boolean;
      };
    };
  }

  interface studyDataType {
    data: {
      result: {
        id: number;
        name: string;
        startDate: string;
        endDatee: string;
        time: string;
        imagePath: string;
        currrentPerson: number;
        maxPerson: number;
        viewCount: number;
        description: string;
        type: {
          id: number;
          name: string;
        };
        leader: {
          id: number;
          imagePath: string;
          nickname: string;
        };
        comments: {
          user: {
            id: number;
            imagePath: string;
            nickname: string;
          };
          content: string;
          replies: {
            user: {
              id: number;
              imagePath: string;
              nickname: string;
            };
            content: string;
          }[];
        }[];
      };
    };
  }

  const [userInfo, setUserInfo] = useState<userDataType>();
  const [studyInfo, setStudyInfo] = useState<studyDataType>();

  const getUserInfo = async () => {
    const data: userDataType = await InfoApi.api.get(`/users/${userId}`);
    if (data) {
      setUserInfo(data);
    }
  };
  const getStudyInfo = async () => {
    const data: studyDataType = await InfoApi.api.get(
      `/studies/${params.studyId}`,
    );
    if (data) {
      setStudyInfo(data);
    }
  };

  const HideNav = () => {
    const navTag = document.querySelector("Nav");
    const fopterTag = document.querySelector("Footer");
    console.log(navTag);
  };
  const [pageState, setPageState] = useRecoilState(PageState);
  useEffect(() => {
    getUserInfo();
    getStudyInfo();
    HideNav();
    setPageState(window.location.pathname);
  }, [pageState]);

  const params: paramsType = useParams();

  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: "user",
  };

  const iconSize = "1.944vw";
  const iconColor = "#F5C82E";
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

  const enterMeeting = () => {
    setIsMeetingStart(true);
    console.log("enter: ", isMeetingStart);
  };

  console.log(params);
  console.log(userInfo);
  console.log(studyInfo);
  return (
    <>
      {isMeetingStart ? (
        <VideoRoomComponent
          sessionName={params.studyId}
          userInfo={localUser}
          //TODO
          user={userInfo?.data.result.nickname}
        />
      ) : (
        // 화상 회의 대기 방
        <>
          <Container>
            <StudyName>
              {/* TODO 스터디 이름 받아오기*/}
              <span>{studyInfo?.data.result.name}</span>
              {/* <span>SSAFY 스터디</span> */}
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
                  {/* TODO */}
                  <span>{userInfo?.data.result.nickname}</span>
                </UserContainer>
              )}
            </Back>
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
            <StartVideoMeeting onClick={enterMeeting}>
              <span>참여</span>
            </StartVideoMeeting>
          </ToolbarItems.ToolbarContainer>
        </>
      )}
    </>
  );
}

export default VideoMeetingPages;
