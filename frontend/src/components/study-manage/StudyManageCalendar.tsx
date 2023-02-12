import styled from "styled-components";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { useState, useEffect } from "react";
import ModalCalendarCommonView from "./ModalCalendarCommonView";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { dateState, Schedules } from "atoms/StudyManageCalendarAtom";
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

const Wrapper = styled.div`
  margin: 3.889vw 10.833vw;
  display: flex;
  flex-direction: column;
  padding: 0 5.556vw;
`;

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
  };
}

function StudyManageCalendar() {
  // 모달
  const [MeetingModalOpen, setMeetingModalOpen] = useState<boolean>(false);
  const [CommonModalOpen, setCommonModalOpen] = useState<boolean>(false);
  const [RegistModalOpen, setRegistModalOpen] = useState<boolean>(false);

  // 모달창 data
  const [type, setType] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [host, setHost] = useState<string>("");
  const [start, setStart] = useState<string>("");
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
  };

  // 날짜 연속 클릭 방지용
  const handleDateClickBlock = () => {
    setDateClickState(false);
  };

  // 이벤트 클릭시 적합한 모달창 띄우기
  const handleEventClick = (arg: any) => {
    if (arg.event._def.extendedProps.host) {
      // 회의 관련 모달창 띄울 때 => 참여 버튼 있는 모달창
      setMeetingModalOpen(true);
      setType(arg.event._def.extendedProps.type);
      setTitle(arg.event._def.title);
      setStart(arg.event._def.date);
      setTime(arg.event._def.extendedProps.time);
      setHost(arg.event._def.extendedProps.host);
    } else if (arg.event._def.extendedProps.desc) {
      // 그냥 일반 일정 관련 모달창 띄울 때 => 단순 조회용 모달창
      console.log(arg.event._def);
      setSelectedId(arg.event._def.extendedProps.scheduleId);
      setCommonModalOpen(true);
    }
  };

  // db에서 전체 일정 데이터 받아오기
  const { data: commonSchedules, refetch } = useQuery<IScheduleData>(
    "allSchedules",
    () => calendarSelectAllApi(),
  );

  // 전체 회의 일정 조회
  const { data: meeetingSchedules } = useQuery<IMeetingData>(
    "allMeetings",
    () => meetingSelectAllApi(),
  );

  // 일정 등록, 수정 ,삭제
  const onRegist = async (registData: IRegistData) => {
    await calendarCreateApi(registData);
    refetch();
  };

  const onUpdate = async (registData: any, id: number) => {
    await scheduleUpdateApi(registData, id);
    refetch();
  };

  const onDelete = async (id: number) => {
    await deleteScheduleApi(id);
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

  return (
    <Wrapper>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={schedules}
        eventClick={handleEventClick}
        selectable={true}
        select={
          dateClickState === false ? handleDateClick : handleDateClickBlock
        }
        unselect={
          dateClickState === false ? handleDateClick : handleDateClickBlock
        }
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
          scheduleId={selectedId}
          updateSchedule={updateSchedule}
          onDelete={onDelete}
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
      {updateModalOpen && (
        <ModalCalendarUpdate
          setModalOpen={setUpdateModalOpen}
          scheduleId={scheduleId}
          start={startTime}
          end={endTime}
          onUpdate={onUpdate}
        />
      )}
    </Wrapper>
  );
}

export default StudyManageCalendar;
