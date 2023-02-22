import styled from "styled-components";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { useState, useEffect } from "react";
import ModalCalendarCommonView from "./ModalCalendarCommonView";
import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import {
<<<<<<< HEAD
  ScheduleRegist,
  Schedules,
  Selector,
} from "atoms/StudyManageCalendarAtom";
import ModalCalendarRegist from "./ModalCalendarRegist";
import ModalCalendarMeetingView from "./ModalCalendarMeetingView";
import { calendarSelectAllApi } from "apis/StudyManageCalendarAPi";
=======
  dateState,
  Schedules,
  StudyCeoRecoil,
  studyIdRecoil,
} from "atoms/StudyManage";
import ModalCalendarRegist, { IRegistData } from "./ModalCalendarRegist";
import ModalCalendarMeetingView from "./ModalCalendarMeetingView";
import {
  calendarCreateApi,
  calendarSelectAllApi,
  deleteScheduleApi,
  meetingSelectAllApi,
  scheduleUpdateApi,
} from "apis/StudyManageCalendarAPi";
import ModalCalendarUpdate from "./ModalCalendarUpdate";
import { UserIdState } from "atoms/UserInfoAtom";
import Swal from "sweetalert2";
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3

const Wrapper = styled.div`
  margin: 3.889vw 10.833vw;
  display: flex;
  flex-direction: column;
  padding: 0 5.556vw;
`;

<<<<<<< HEAD
interface CommonSchedules {
  id: string; //일정 식별자
  startTime: string; //일정 시작 일자
  endTime: string; //일정 마감일자
  title: string; //일정 제목
  description: string;
  url?: string | null; //일정 url
  type: {
    id: string;
    name: string; //유형이름
=======
interface IScheduleData {
  code: number;
  isSuccess: boolean;
  message: string;
  result: [
    {
      id: number; //일정 식별자
      startTime: string; //일정 시작 일자
      endTime: string; //일정 마감일자
      title: string; //일정 제목
      description: string;
      url?: string | null; //일정 url
      type: {
        id: number;
        name: string; //유형이름
      };
      color: string;
    },
  ];
}

interface IMeetingData {
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
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
  };
}

function StudyManageCalendar() {
<<<<<<< HEAD
=======
  const studyId = useRecoilValue(studyIdRecoil);
  const userId = useRecoilValue(UserIdState);
  const studyCeo = useRecoilValue(StudyCeoRecoil);

>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
  // 모달
  const [MeetingModalOpen, setMeetingModalOpen] = useState<boolean>(false);
  const [CommonModalOpen, setCommonModalOpen] = useState<boolean>(false);
  const [RegistModalOpen, setRegistModalOpen] = useState<boolean>(false);

  // 모달창 data
  const [type, setType] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [host, setHost] = useState<string>("");
  const [start, setStart] = useState<string>("");
<<<<<<< HEAD
  const [end, setEnd] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [link, setLink] = useState<string>("");
  // 달력 선택 시 시작날짜, 끝날짜 default값 설정
  const [selectStart, setSelectStart] = useState<string>("");
  const [selectEnd, setSelectEnd] = useState<string>("");

  // 여러 일정 저장된 atom
  const [schedules, setSchedules] = useRecoilState(Schedules);
  // 단건 일정 저장된 atom
  const schedule = useRecoilValue(ScheduleRegist);

  // 날짜 클릭 시 일정 등록 모달 띄우기
  const handleDateClick = (arg: any) => {
    const endDate = new Date(arg.end);
    const yesterday = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate() - 1,
    );
    const endStr =
      yesterday.getFullYear().toString() +
      "-" +
      (yesterday.getMonth() + 1).toString() +
      "-" +
      yesterday.getDate().toString();
    setSelectStart(arg.startStr);
    setSelectEnd(endStr);
    setRegistModalOpen(true);
=======
  const [time, setTime] = useState<string>("");
  // 달력 선택 시 시작날짜, 끝날짜 default값 설정
  const [selectStart, setSelectStart] = useState<string>("");
  const [selectEnd, setSelectEnd] = useState<string>("");
  // scheduleId
  const [selectedId, setSelectedId] = useState<number>(0);

  // 여러 일정 저장된 atom
  const [schedules, setSchedules] = useRecoilState(Schedules);

  // 이벤트 클릭 상태값
  const [dateClickState, setDateClickState] = useRecoilState(dateState);

  // 날짜 클릭 시 일정 등록 모달 띄우기
  const handleDateClick = (arg: any) => {
    console.log("일정 클릭!!!");
    if (userId !== studyCeo) {
      Swal.fire({
        icon: "error",
        title: "이런...",
        text: "스터디장만 입력가능합니다!",
      });
      // alert창 두번 뜨는 문제 해결..
      setDateClickState(true);
    } else {
      setDateClickState(true);
      const endDate = new Date(arg.end);
      const yesterday = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate() - 1,
      );
      const endStr =
        yesterday.getFullYear().toString() +
        "-" +
        (yesterday.getMonth() + 1).toString() +
        "-" +
        yesterday.getDate().toString();
      setSelectStart(arg.startStr);
      setSelectEnd(endStr);
      setRegistModalOpen(true);
    }
  };

  // 날짜 연속 클릭 방지용
  const handleDateClickBlock = () => {
    setDateClickState(false);
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
  };

  // 이벤트 클릭시 적합한 모달창 띄우기
  const handleEventClick = (arg: any) => {
    if (arg.event._def.extendedProps.host) {
      // 회의 관련 모달창 띄울 때 => 참여 버튼 있는 모달창
      setMeetingModalOpen(true);
      setType(arg.event._def.extendedProps.type);
      setTitle(arg.event._def.title);
<<<<<<< HEAD
      setStart(arg.event._def.start);
=======
      setStart(arg.event._def.date);
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
      setTime(arg.event._def.extendedProps.time);
      setHost(arg.event._def.extendedProps.host);
    } else if (arg.event._def.extendedProps.desc) {
      // 그냥 일반 일정 관련 모달창 띄울 때 => 단순 조회용 모달창
<<<<<<< HEAD
      setCommonModalOpen(true);
      setTitle(arg.event._def.title);
      setDesc(arg.event._def.extendedProps.desc);
      setType(arg.event._def.extendedProps.type);
      setLink(arg.event._def.extendedProps.link);
      setStart(arg.event._def.start);
      setEnd(arg.event._def.end);
      setTime(arg.event._def.extendedProps.time);
    }
  };

  // 일정 등록시 post요청
  const onRegist = () => {
    // post
    // calendarCreateApi(schedule);
    // 일정 등록 시 바로 달력에 표시되는지 체크
  };

  // db에서 전체 일정 데이터 받아오기
  // missing queryFn 오류
  const { data: commonSchedules } = useQuery<CommonSchedules[]>(
    "allSchedules",
    () => calendarSelectAllApi(),
  );

  console.log(" commonSchedules data: ", commonSchedules);

  const schdls = useRecoilValue(Selector);

  console.log("현재 스케쥴 목록 : ", schdls);

  console.log("렌더링");

  // 무한 렌더링,, 노션에 정리
  // useEffect 로 db에섯 data 받아올 떄만 실행할 수 있도록 처리함
  // 즉, commonSchedules 변화가 있을 때만 아래 실행
  useEffect(() => {
    setSchedules([]);
    commonSchedules?.forEach((el: CommonSchedules) => {
      console.log("forEach 작동");
      const temp = {
        title: el.title,
        start: el.startTime.split(" ")[0],
        end: el.endTime.split(" ")[0],
        // 시작 시간 startTime.split(" ")[1]
        // 마감 시간 endTime.split(" ")[1]
        desc: el.description,
        type: el.type.name,
        link: el.url,
      };
      setSchedules((oldSchedules) => [...oldSchedules, temp]);
    });
  }, [commonSchedules]);
=======
      console.log(arg.event._def);
      setSelectedId(arg.event._def.extendedProps.scheduleId);
      setCommonModalOpen(true);
    }
  };

  // db에서 전체 일정 데이터 받아오기
  const { data: commonSchedules, refetch } = useQuery<IScheduleData>(
    "allSchedules",
    () => calendarSelectAllApi(studyId),
  );

  // 전체 회의 일정 조회
  const { data: meeetingSchedules } = useQuery<IMeetingData>(
    "allMeetings",
    () => meetingSelectAllApi(studyId),
  );

  // 일정 등록, 수정 ,삭제
  const onRegist = async (registData: IRegistData) => {
    await calendarCreateApi(registData, studyId);
    refetch();
  };

  const onUpdate = async (registData: any, id: number) => {
    await scheduleUpdateApi(registData, id, studyId);
    refetch();
  };

  const onDelete = async (id: number) => {
    await deleteScheduleApi(id, studyId);
    refetch();
  };

  useEffect(() => {
    setSchedules([]);

    // 회의 일정 추가
    meeetingSchedules?.result.meetings.forEach((el) => {
      const temp = {
        meetingId: el.meetingId,
        title: el.name,
        type: el.type.name,
        date: el.startTime.split("T")[0],
        time: el.startTime.split("T")[0],
        host: el.starter.nickname,
        color: "#314E8D",
        textColor: "#FFFFFF",
      };

      setSchedules((oldSchedules) => [...oldSchedules, temp]);
    });

    const datas = commonSchedules?.result;

    datas?.forEach((el) => {
      const color =
        el.color === "YELLOW"
          ? "#FFFF8C"
          : el.color === "RED"
          ? "#FFA8A8"
          : el.color === "GRAY"
          ? "#C9C9C9"
          : el.color === "BLUE"
          ? "#A5E2FF"
          : "#99FF99";

      const temp = {
        scheduleId: el.id,
        title: el.title,
        start: el.startTime.split("T")[0],
        end: el.endTime.split("T")[0],
        timeStart: el.startTime.split("T")[1],
        timeEnd: el.endTime.split("T")[1],
        desc: el.description,
        type: el.type.name,
        link: el.url,
        color: color,
        textColor: "#000000",
      };

      setSchedules((oldSchedules) => [...oldSchedules, temp]);
    });
  }, [commonSchedules, meeetingSchedules]);

  // 일정수정
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [scheduleId, setScheduleId] = useState<number>(0);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const updateSchedule = (id: number, start: string, end: string) => {
    setScheduleId(id);
    setStartTime(start);
    setEndTime(end);
    setUpdateModalOpen(true);
  };
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3

  return (
    <Wrapper>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={schedules}
        eventClick={handleEventClick}
        selectable={true}
<<<<<<< HEAD
        select={handleDateClick}
        unselect={handleDateClick}
=======
        select={
          dateClickState === false ? handleDateClick : handleDateClickBlock
        }
        unselect={
          dateClickState === false ? handleDateClick : handleDateClickBlock
        }
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
        droppable={true}
      />
      {MeetingModalOpen && (
        <ModalCalendarMeetingView
          setModalOpen={setMeetingModalOpen}
          type={type}
          title={title}
          start={start}
          time={time}
          host={host}
        />
      )}
      {CommonModalOpen && (
        <ModalCalendarCommonView
          setModalOpen={setCommonModalOpen}
<<<<<<< HEAD
          title={title}
          start={start}
          end={end}
          desc={desc}
          type={type}
          link={link}
=======
          scheduleId={selectedId}
          updateSchedule={updateSchedule}
          onDelete={onDelete}
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
        />
      )}
      {RegistModalOpen && (
        <ModalCalendarRegist
          setModalOpen={setRegistModalOpen}
          selectStart={selectStart}
          selectEnd={selectEnd}
          onRegist={onRegist}
        />
      )}
<<<<<<< HEAD
=======
      {updateModalOpen && (
        <ModalCalendarUpdate
          setModalOpen={setUpdateModalOpen}
          scheduleId={scheduleId}
          start={startTime}
          end={endTime}
          onUpdate={onUpdate}
        />
      )}
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
    </Wrapper>
  );
}

export default StudyManageCalendar;
