import styled from "styled-components";
import { useEffect, useState } from "react";
import ModalMeetingCreate from "./ModalMeetingCreate";
import { useQuery } from "react-query";
import {
  MeetingCreateApi,
  MeetingSelectAllApi,
} from "apis/StudyManageMeetingApi";
import { useRecoilValue } from "recoil";
import { studyIdRecoil } from "atoms/StudyManage";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Wrapper = styled.div`
  margin: 3.889vw 21.111vw;
  display: flex;
  flex-direction: column;

  a {
    text-decoration: none;
    color: ${(props) => props.theme.blackColor};
  }
`;

const StudyTitle = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.blackColorOpacity4};
  font-size: 1.111vw;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1.111vw 0.556vw;
`;

const CreatedBox = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* height: 34.722vw; */
`;

const MeetingCardFront = styled.div`
  width: 13.889vw;
  height: 13.889vw;
  border-radius: 1.111vw;
  box-shadow: 5px 5px 5px ${(props) => props.theme.blackColorOpacity2};
  background-color: ${(props) => props.theme.blackColor};
  margin: 1.111vw 1.111vw;
  text-align: center;
  color: white;
  backface-visibility: hidden;
  transition: 1s;
  position: absolute;
  transform: rotateY(0deg);
`;

const MeetingCardBack = styled(MeetingCardFront)`
  position: static;
  transform: rotateY(-180deg);
  &:hover {
    transform: rotateY(0deg);
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MeetingCard = styled.div`
  width: 13.889vw;
  height: 13.889vw;
  border-radius: 1.111vw;
  box-shadow: 5px 5px 5px ${(props) => props.theme.blackColorOpacity2};
  background-color: ${(props) => props.theme.blackColor};
  margin: 1.111vw 1.111vw;
  text-align: center;
  color: white;
  position: relative;
  transition: 1s;
`;

const BoxMain = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1.667vw 0;
  /* width: 48.611vw; */
  perspective: 20.833vw;
  &:hover ${MeetingCardFront} {
    transform: rotateY(180deg);
  }
  &:hover ${MeetingCardBack} {
    transform: rotateY(0deg);
  }
`;

const BoxMain2 = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  /* justify-content: cent  er; */
  /* align-items: center; */
  padding: 1.667vw 0;
  margin: 0 3.75vw;
`;

const MeetingImg = styled.img`
  width: 13.889vw;
  height: 13.889vw;
  border-radius: 1.111vw;
  position: absolute;
  top: 0;
  left: 0;
  transition: 1s;
`;

const MeetingContent = styled.div`
  width: 10.417vw;
  height: 10.417vw;
  /* border-radius: 1.111vw; */
  position: absolute;
  top: 1.736vw;
  left: 1.736vw;
  background-color: ${(props) => props.theme.blackColorOpacity2};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: 1s;
  font-size: 0.972vw;

  span {
    margin: 0.556vw 0;
  }
`;

const BoxFooter = styled.div`
  width: 100%;
  padding: 1.667vw;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const AttendBtn = styled.button`
  color: white;
  background-color: transparent;
  padding: 0.972vw 2.222vw;
  border: 1px solid transparent;
  -webkit-transition: all 0.4s cubic-bezier(0.5, 0.24, 0, 1);
  transition: all 0.4s cubic-bezier(0.5, 0.24, 0, 1);
  position: relative;
  font-size: 0.972vw;
  cursor: pointer;

  a {
    color: ${(props) => props.theme.mainColor};
    text-decoration: none;
  }

  &::before {
    content: "";
    position: absolute;
    left: 0px;
    bottom: 0px;
    z-index: -1;
    width: 0%;
    height: 1px;
    background: ${(props) => props.theme.mainColor};
    box-shadow: inset 0px 0px 0px ${(props) => props.theme.mainColor};
    display: block;
    -webkit-transition: all 0.4s cubic-bezier(0.5, 0.24, 0, 1);
    transition: all 0.4s cubic-bezier(0.5, 0.24, 0, 1);
  }

  &:hover::before {
    width: 100%;
  }

  &::after {
    content: "";
    position: absolute;
    right: 0px;
    top: 0px;
    z-index: -1;
    width: 0%;
    height: 1px;
    background: ${(props) => props.theme.mainColor};
    -webkit-transition: all 0.4s cubic-bezier(0.5, 0.24, 0, 1);
    transition: all 0.4s cubic-bezier(0.5, 0.24, 0, 1);
  }
  &:hover::after {
    width: 100%;
  }
  &:hover {
    border-left: 1px solid ${(props) => props.theme.mainColor};
    border-right: 1px solid ${(props) => props.theme.mainColor};
  }
`;

const CreateBtn = styled.button`
  background-color: ${(props) => props.theme.mainColor};
  border: none;
  box-shadow: 2px 2px 2px ${(props) => props.theme.blackColorOpacity3};
  border-radius: 0.278vw;
  padding: 0.347vw 0.972vw;
  cursor: pointer;
  font-size: 0.972vw;

  &:hover {
    background-color: ${(props) => props.theme.mainColorDark};
  }
`;

const NoData = styled.div`
  margin: 0 0.556vw;
  width: 100%;
  height: 13.889vw;
  /* border: 1px dashed ${(props) => props.theme.blackColorOpacity}; */
  background-color: ${(props) => props.theme.subColor};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.111vw;
`;

interface IData {
  code: number;
  isSuccess: boolean;
  message: string;
  result: {
    meetings: [
      {
        meetingId: number;
        name: string;
        sessionId: number;
        startTime: string;
        starter: {
          nickname: string;
          profileImageUrl: string;
          starterId: number;
        };
        status: string;
        type: {
          id: number;
          name: string;
        };
      },
    ];
  };
}

function StudyMeetingRecord() {
  const studyId = useRecoilValue(studyIdRecoil);

  // 1. 회의 생성 post
  // 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // 모달창 노출 => 생성은 모달에서
  const showModal = () => {
    setModalOpen(true);
  };

  // 2. 회의 전체 조회(진행중 + 지난 ) GET
  const { data: meetingList, refetch } = useQuery<IData>("allMeetings", () =>
    MeetingSelectAllApi(studyId),
  );

  const [proceedingCheck, setProceedingCheck] = useState<boolean>(false);

  useEffect(() => {
    meetingList?.result.meetings.forEach((el) => {
      if (el.status === "proceeding") {
        setProceedingCheck(true);
      }
    });
  });

  const createMeeting = async (data: any) => {
    // 회의생성
    const response = await MeetingCreateApi(data, studyId);
    if (response.data.code === 200) {
    } else {
      Swal.fire({
        icon: "error",
        title: "이런...",
        text: response.data.message,
      });
    }

    refetch();
  };

  return (
    <Wrapper>
      <StudyTitle>
        <p>생성된 회의</p>
      </StudyTitle>
      <CreatedBox>
        <BoxMain>
          {meetingList?.result.meetings.map((el: any, index) => {
            if (el.status === "proceeding") {
              return (
                <div key={index}>
                  <MeetingCardFront>
                    <MeetingImg
                      src={require("../../assets/img/meeting_photo2.png")}
                    />
                    <MeetingContent>
                      <span>{el.name}</span>
                      <span>{el.startTime.split("T")[0]}</span>
                      <span> 주최자 : {el.starter.nickname}</span>
                      <span> 유형 : {el.type.name}</span>
                    </MeetingContent>
                  </MeetingCardFront>
                  <MeetingCardBack>
                    <AttendBtn>
                      {/* TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
                      <Link to={`/meeting/${studyId}`}>참여하기</Link>
                    </AttendBtn>
                  </MeetingCardBack>
                </div>
              );
            }
          })}
          {!proceedingCheck ? <NoData>진행중인 회의가 없습니다.</NoData> : null}
        </BoxMain>
        <BoxFooter>
          <CreateBtn onClick={showModal}>회의 생성</CreateBtn>
        </BoxFooter>
      </CreatedBox>
      <StudyTitle>
        <p>지난 회의</p>
      </StudyTitle>
      <CreatedBox>
        <BoxMain2>
          {meetingList?.result.meetings.map((el: any, index) => {
            if (el.status === "end") {
              return (
                <MeetingCard key={index}>
                  <MeetingImg
                    src={require("../../assets/img/meeting_photo2.png")}
                  />
                  <MeetingContent>
                    <span>{el.name}</span>
                    <span>{el.startTime.split("T")[0]}</span>
                    <span> 주최자 : {el.starter.nickname}</span>
                    <span> 유형 : {el.type.name}</span>
                  </MeetingContent>
                </MeetingCard>
              );
            }
          })}
        </BoxMain2>
      </CreatedBox>
      {modalOpen && (
        <ModalMeetingCreate
          setModalOpen={setModalOpen}
          createMeeting={createMeeting}
        />
      )}
    </Wrapper>
  );
}

export default StudyMeetingRecord;
