<<<<<<< HEAD
import { SetStateAction, useEffect, useRef } from "react";
import styled from "styled-components";
import { ReactComponent as Close } from "../../assets/icon/Close.svg";
import { ReactComponent as Calendar } from "../../assets/icon/Calendar.svg";
import { ReactComponent as Hashtag } from "../../assets/icon/Hashtag.svg";
import { ReactComponent as LinkLogo } from "../../assets/icon/Link.svg";

interface PropsType {
  setModalOpen: React.Dispatch<SetStateAction<boolean>>;
  title: string;
  start: string;
  end: string;
  // startTime: string;
  // endTime: string;
  desc: string;
  type: string;
  link: string;
}

const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
  position: fixed;
  width: 28.889vw;
  height: 23.333vw;
=======
import { SetStateAction, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Close } from "../../assets/icon/Close.svg";
import { ReactComponent as Calendar } from "../../assets/icon/Calendar.svg";
import { ReactComponent as Time } from "../../assets/icon/Time.svg";
import { ReactComponent as Url } from "../../assets/icon/Link.svg";
import { useQuery } from "react-query";
import { scheduleSelectApi } from "apis/StudyManageCalendarAPi";
import Swal from "sweetalert2";
import { useRecoilValue } from "recoil";
import { StudyCeoRecoil, studyIdRecoil } from "atoms/StudyManage";
import { UserIdState } from "atoms/UserInfoAtom";

interface PropsType {
  setModalOpen: React.Dispatch<SetStateAction<boolean>>;
  scheduleId: number;
  updateSchedule: Function;
  onDelete: Function;
}

const ModalContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: fixed;
  width: 22.222vw;
  height: 33.333vw;
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
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
<<<<<<< HEAD
  background-color: ${(props) => props.theme.mainColorOpacity};
=======
  /* background-color: ${(props) => props.theme.mainColorOpacity}; */
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
  border-radius: 0.556vw 0.556vw 0 0;
  display: flex;
  flex-direction: row;
  padding: 0.556vw;
`;

const Space = styled.div`
  width: 90%;
  height: 100%;
<<<<<<< HEAD
  color: ${(props) => props.theme.mainColorDark};
=======
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
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
<<<<<<< HEAD
  flex-direction: row;
  padding: 2vw 1vw;
  border-bottom: 1px solid ${(props) => props.theme.blackColorOpacity};
=======
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0 1vw 1vw;
  /* border-bottom: 1px solid ${(props) => props.theme.blackColorOpacity}; */
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
  /* align-items: center; */
`;

const ModalImg = styled.div`
<<<<<<< HEAD
  padding: 1vw;
  width: 30%;
`;

const ModalContent = styled.div`
  width: 70%;
  /* padding: 0 3vw; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 2vw;
=======
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
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
`;

const Title = styled.input`
  border: none;
<<<<<<< HEAD
  color: ${(props) => props.theme.mainColorDark};
  font-size: 1.364vw;
=======
  /* color: ${(props) => props.theme.mainColorDark}; */
  font-size: 1.111vw;
  text-align: center;
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
  font-weight: bold;
  margin-bottom: 1vw;
  background-color: ${(props) => props.theme.whiteColor};
`;

const Text = styled.div`
<<<<<<< HEAD
  background-color: ${(props) => props.theme.mainColorOpacity};
  padding: 0.5vw;
  width: 100%;
  /* border: 1px solid ${(props) => props.theme.mainColor}; */
  border-radius: 0.5vw;
  min-height: 1.364vw;
=======
  background-color: #f6f6f6;
  border: 1px dotted ${(props) => props.theme.blackColorOpacity2};
  padding: 0.5vw;
  width: 100%;
  border-radius: 0.278vw;
  min-height: 5.556vw;
  max-height: 5.556vw;
  overflow-y: scroll;
  margin-bottom: 1vw;
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    height: 17%;
<<<<<<< HEAD
    background-color: ${(props) => props.theme.mainColor};
=======
    background-color: ${(props) => props.theme.pointColor};
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
    border-radius: 10px;
  }
  margin-bottom: 0.455vw;
`;

const HashtagBox = styled.div`
  display: flex;
<<<<<<< HEAD
=======
  align-items: center;
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
  flex-direction: row;
  width: 100%;
  height: 1.136vw;
  margin-bottom: 0.455vw;
<<<<<<< HEAD
=======
  padding: 0 0.556vw;

  span {
    width: 1.111vw;
  }
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
`;

const HashtagTxt = styled.div`
  width: 90%;
  color: ${(props) => props.theme.blackColorOpacity2};
  font-size: 0.909vw;
<<<<<<< HEAD
=======
  margin-left: 0.556vw;
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
`;

const Link = styled.a`
  cursor: pointer;
  width: 90%;
  color: ${(props) => props.theme.blackColorOpacity2};
  font-size: 0.909vw;
<<<<<<< HEAD
`;

const ModalBtn = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 0.5vw 0;
`;

const YellowBtn = styled.button`
  cursor: pointer;
  border-radius: 0.25vw;
  padding: 0.5vw 1vw;
  background-color: ${(props) => props.theme.mainColor};
  color: ${(props) => props.theme.blackColor};
  border: 0;
  margin-right: 1vw;
  font-size: 1vw;
`;

function ModalBasic(props: PropsType) {
  // const [modalOpen, setModalOpen] = useState<boolean>(true);
=======
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

const ModalBtnBox = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 0 0 0.556vw 0.556vw;
`;

const ModalBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 0.972vw;
`;

const UpdateDiv = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 0 0.556vw;
  background-color: #e9e9e9;
  color: black;
`;

const DeleteDiv = styled(UpdateDiv)`
  border-radius: 0 0 0.556vw 0;
  background-color: ${(props) => props.theme.pointColor};

  ${ModalBtn} {
    color: white;
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

function ModalCalendarCommonView(props: PropsType) {
  const studyId = useRecoilValue(studyIdRecoil);

  const [title, setTitle] = useState<string | undefined>("");
  const [content, setContent] = useState<string | undefined>("");
  const [start, setStart] = useState<string | undefined>("");
  const [end, setEnd] = useState<string | undefined>("");
  const [type, setType] = useState<string | undefined>("");
  const [url, setUrl] = useState<string | undefined>("");

>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
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
<<<<<<< HEAD
=======

  // 일정 단건 조회 scheduleId
  const { data: scheduleInfo } = useQuery<IScheduleInfo>(
    "scheduleSelectApi",
    () => scheduleSelectApi(props.scheduleId, studyId),
  );

  // 일정 삭제
  const deleteSchedule = () => {
    Swal.fire({
      title: "일정 삭제를 진행하겠습니까??",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        props.onDelete(props.scheduleId);
        Swal.fire("삭제완료!", "", "success");
        closeModal();
      }
    });

    // if (window.confirm("일정을 삭제하시겠습니까?")) {
    //   props.onDelete(props.scheduleId);
    //   closeModal();
    // }
  };
  // 일정 수정
  const updateSchedule = () => {
    props.updateSchedule(props.scheduleId, start, end);
    closeModal();
  };

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

  const studyCeoId = useRecoilValue(StudyCeoRecoil);
  const userId = useRecoilValue(UserIdState);

>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
  return (
    <Backdrop>
      <ModalContainer ref={modalRef}>
        <ModalHead>
          <Space>
            <p>Schedule</p>
          </Space>
          <CloseBtn onClick={closeModal}>
<<<<<<< HEAD
            <Close width="100%" height="100%" fill="#0000007b" />
=======
            <Close width="1.667vw" fill="#0000007b" />
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
          </CloseBtn>
        </ModalHead>
        <ModalConWrapper>
          <ModalImg>
<<<<<<< HEAD
            <Calendar width="100%" height="100%" />
          </ModalImg>
          <ModalContent>
            <Title placeholder="회의 제목" disabled value={props.title} />
            <Text>{props.desc}</Text>
            <HashtagBox>
              <Hashtag width="10%" height="100%" />
              <HashtagTxt>{props.type}</HashtagTxt>
            </HashtagBox>
            {props.link && (
              <HashtagBox>
                <Hashtag width="10%" height="100%" />
                <Link href={props.link}>링크 바로가기</Link>
              </HashtagBox>
            )}
          </ModalContent>
        </ModalConWrapper>
        <ModalBtn>
          <YellowBtn onClick={closeModal}>취소</YellowBtn>
        </ModalBtn>
      </ModalContainer>
    </Backdrop>
  );
}
export default ModalBasic;
=======
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
        <ModalBtnBox>
          {userId === studyCeoId ? (
            <>
              <UpdateDiv>
                <ModalBtn onClick={updateSchedule}>수정</ModalBtn>
              </UpdateDiv>
              <DeleteDiv>
                <ModalBtn onClick={deleteSchedule}>삭제</ModalBtn>
              </DeleteDiv>{" "}
            </>
          ) : null}
        </ModalBtnBox>
      </ModalContainer>{" "}
    </Backdrop>
  );
}
export default ModalCalendarCommonView;
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
