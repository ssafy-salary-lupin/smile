import { SetStateAction, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Close } from "../../assets/icon/Close.svg";
import { ReactComponent as Calendar } from "../../assets/icon/Calendar.svg";
import { ReactComponent as Time } from "../../assets/icon/Time.svg";
import { ReactComponent as Url } from "../../assets/icon/Link.svg";
import { useQuery } from "react-query";
import {
  deleteScheduleApi,
  scheduleSelectApi,
} from "apis/StudyManageCalendarAPi";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { studyIdRecoil } from "atoms/StudyManage";

interface PropsType {
  setModalOpen: React.Dispatch<SetStateAction<boolean>>;
  scheduleId: number;
}

const ModalContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: fixed;
  width: 22.222vw;
  height: 33.333vw;
  z-index: 999;
  background-color: white;
  border-radius: 0.556vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Backdrop = styled.div`
  width: 100%; // 100vw;
  height: 100%; //  100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalHead = styled.div`
  height: 15%;
  width: 100%;
  /* background-color: ${(props) => props.theme.mainColorOpacity}; */
  border-radius: 0.556vw 0.556vw 0 0;
  display: flex;
  flex-direction: row;
  padding: 0.556vw;
`;

const Space = styled.div`
  width: 90%;
  height: 100%;
  font-size: 1.25vw;
  vertical-align: middle;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 1vw;
  font-weight: 600;
`;

const CloseBtn = styled.div`
  width: 10%;
  height: 100%;
  cursor: pointer;
  padding: 0.25vw;
`;

const ModalConWrapper = styled.div`
  height: 70%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0 1vw 1vw;
  /* border-bottom: 1px solid ${(props) => props.theme.blackColorOpacity}; */
  /* align-items: center; */
`;

const ModalImg = styled.div`
  width: 100%;
  text-align: center;
  /* margin-bottom: 1vw; */
`;

const ModalContent = styled.div`
  width: 100%;
  /* padding: 0 3vw; */
  /* align-items: center; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 1.111vw;
  /* margin-bottom: 3.75vw; */
`;

const Title = styled.input`
  border: none;
  /* color: ${(props) => props.theme.mainColorDark}; */
  font-size: 1.111vw;
  text-align: center;
  font-weight: bold;
  margin-bottom: 1vw;
  background-color: ${(props) => props.theme.whiteColor};
`;

const Text = styled.div`
  background-color: #f6f6f6;
  border: 1px dotted ${(props) => props.theme.blackColorOpacity2};
  padding: 0.5vw;
  width: 100%;
  border-radius: 0.278vw;
  min-height: 5.556vw;
  max-height: 5.556vw;
  overflow-y: scroll;
  margin-bottom: 1vw;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    height: 17%;
    background-color: ${(props) => props.theme.pointColor};
    border-radius: 10px;
  }
  margin-bottom: 0.455vw;
`;

const HashtagBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 1.136vw;
  margin-bottom: 0.455vw;
  padding: 0 0.556vw;

  span {
    width: 1.111vw;
  }
`;

const HashtagTxt = styled.div`
  width: 90%;
  color: ${(props) => props.theme.blackColorOpacity2};
  font-size: 0.909vw;
  margin-left: 0.556vw;
`;

const Link = styled.a`
  cursor: pointer;
  width: 90%;
  color: ${(props) => props.theme.blackColorOpacity2};
  font-size: 0.909vw;
  margin-left: 0.556vw;
`;

const TypeBox = styled.div`
  background-color: ${(props) => props.theme.pointColor};
  color: white;
  border-radius: 3.472vw;
  font-size: 0.909vw;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: 1.944vw;
  p {
    padding: none;
  }
`;

export interface IScheduleInfo {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    id: number; //일정 식별자
    startTime: string; //시작시간
    endTime: string; //종료시간.
    title: string;
    description: string;
    url: string;
    // color: string; //일정 표시 색깔
    type: {
      id: number; //유형 식별자
      name: string;
    };
  };
}

function ModalCalendarCommonOnlyView(props: PropsType) {
  const studyId = useRecoilValue(studyIdRecoil);

  const [title, setTitle] = useState<string | undefined>("");
  const [content, setContent] = useState<string | undefined>("");
  const [start, setStart] = useState<string | undefined>("");
  const [end, setEnd] = useState<string | undefined>("");
  const [type, setType] = useState<string | undefined>("");
  const [url, setUrl] = useState<string | undefined>("");

  // 모달 끄기
  const closeModal = () => {
    props.setModalOpen(false);
  };
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = (event: any) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        props.setModalOpen(false);
      }
    };

    // 이벤트 핸들러 등록
    document.addEventListener("mousedown", handler);
    // document.addEventListener('touchstart', handler); // 모바일 대응

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener("mousedown", handler);
      // document.removeEventListener('touchstart', handler); // 모바일 대응
    };
  });

  // 일정 단건 조회 scheduleId
  const { data: scheduleInfo } = useQuery<IScheduleInfo>(
    "scheduleSelectApi",
    () => scheduleSelectApi(props.scheduleId, studyId),
  );

  useEffect(() => {
    // 끝날짜 하루 추가되는 오류 수정
    if (scheduleInfo?.result.endTime !== undefined) {
      const date =
        new Date(
          new Date(scheduleInfo?.result.endTime).getFullYear(),
          new Date(scheduleInfo?.result.endTime).getMonth(),
          new Date(scheduleInfo?.result.endTime).getDate() - 1,
          new Date(scheduleInfo?.result.endTime).getHours(),
          new Date(scheduleInfo?.result.endTime).getMinutes(),
        )
          .getFullYear()
          .toString() +
        "-" +
        (
          "0" +
          (new Date(
            new Date(scheduleInfo?.result.endTime).getFullYear(),
            new Date(scheduleInfo?.result.endTime).getMonth(),
            new Date(scheduleInfo?.result.endTime).getDate() - 1,
            new Date(scheduleInfo?.result.endTime).getHours(),
            new Date(scheduleInfo?.result.endTime).getMinutes(),
          ).getMonth() +
            1)
        )
          .slice(-2)
          .toString() +
        "-" +
        (
          "0" +
          new Date(
            new Date(scheduleInfo?.result.endTime).getFullYear(),
            new Date(scheduleInfo?.result.endTime).getMonth(),
            new Date(scheduleInfo?.result.endTime).getDate() - 1,
            new Date(scheduleInfo?.result.endTime).getHours(),
            new Date(scheduleInfo?.result.endTime).getMinutes(),
          ).getDate()
        )
          .slice(-2)
          .toString() +
        " " +
        (
          "0" +
          new Date(
            new Date(scheduleInfo?.result.endTime).getFullYear(),
            new Date(scheduleInfo?.result.endTime).getMonth(),
            new Date(scheduleInfo?.result.endTime).getDate(),
            new Date(scheduleInfo?.result.endTime).getHours(),
            new Date(scheduleInfo?.result.endTime).getMinutes(),
          ).getHours()
        )
          .slice(-2)
          .toString() +
        ":" +
        (
          "0" +
          new Date(
            new Date(scheduleInfo?.result.endTime).getFullYear(),
            new Date(scheduleInfo?.result.endTime).getMonth(),
            new Date(scheduleInfo?.result.endTime).getDate(),
            new Date(scheduleInfo?.result.endTime).getHours(),
            new Date(scheduleInfo?.result.endTime).getMinutes(),
          ).getMinutes()
        )
          .slice(-2)
          .toString();

      setTitle(scheduleInfo?.result.title);
      setContent(scheduleInfo?.result.description);
      setStart(
        scheduleInfo?.result.startTime.split("T")[0] +
          " " +
          scheduleInfo?.result.startTime.split("T")[1].substring(0, 5),
      );
      setEnd(date.split(" ")[0] + " " + date.split(" ")[1]);
      setType(scheduleInfo?.result.type.name);
      setUrl(scheduleInfo?.result.url);
    }
  }, [scheduleInfo]);

  return (
    <Backdrop>
      <ModalContainer ref={modalRef}>
        <ModalHead>
          <Space>
            <p>Schedule</p>
          </Space>
          <CloseBtn onClick={closeModal}>
            <Close width="1.667vw" fill="#0000007b" />
          </CloseBtn>
        </ModalHead>
        <ModalConWrapper>
          <ModalImg>
            <Calendar width="8.333vw" />
          </ModalImg>
          <ModalContent>
            <Title placeholder="회의 제목" disabled value={title || ""} />
            <Text>{content || ""}</Text>
            <HashtagBox>
              <Time width="1.111vw" fill="#898989" />
              <HashtagTxt>{start || ""}</HashtagTxt>
            </HashtagBox>
            <HashtagBox>
              <span></span>
              <HashtagTxt>~ {end || ""}</HashtagTxt>
            </HashtagBox>
            {scheduleInfo?.result.url && (
              <HashtagBox>
                <Url width="1.111vw" stroke="#898989" />
                <Link href={url || ""}>링크 바로가기</Link>
              </HashtagBox>
            )}
            <TypeBox>
              <p>{type || ""}</p>
            </TypeBox>
          </ModalContent>
        </ModalConWrapper>
      </ModalContainer>
    </Backdrop>
  );
}
export default ModalCalendarCommonOnlyView;
