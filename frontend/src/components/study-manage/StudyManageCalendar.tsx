import styled from "styled-components";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { useState, useEffect } from "react";
import ModalCalendarCommonView from "./ModalCalendarCommonView";
import {
  calendarCreateApi,
  calendarSelectAllApi,
} from "apis/StudyManageCalendarAPi";
import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import { ScheduleRegist, Schedules } from "atoms/StudyManageCalendarAtom";
import ModalCalendarRegist from "./ModalCalendarRegist";
import ModalCalendarMeetingView from "./ModalCalendarMeetingView";

const Wrapper = styled.div`
  margin: 3.889vw 10.833vw;
  display: flex;
  flex-direction: column;
  padding: 0 5.556vw;
`;

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
  };

  // 이벤트 클릭시 적합한 모달창 띄우기
  const handleEventClick = (arg: any) => {
    if (arg.event._def.extendedProps.host) {
      // 회의 관련 모달창 띄울 때 => 참여 버튼 있는 모달창
      setMeetingModalOpen(true);
      setType(arg.event._def.extendedProps.type);
      setTitle(arg.event._def.title);
      setStart(arg.event._def.start);
      setTime(arg.event._def.extendedProps.time);
      setHost(arg.event._def.extendedProps.host);
    } else if (arg.event._def.extendedProps.desc) {
      // 그냥 일반 일정 관련 모달창 띄울 때 => 단순 조회용 모달창
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
    calendarSelectAllApi,
  );

  console.log(" commonSchedules : ", commonSchedules);

  // 무한 렌더링,, 노션에 정리
  // useEffect 로 db에섯 data 받아올 떄만 실행할 수 있도록 처리함
  // 즉, commonSchedules 변화가 있을 때만 아래 실행
  // useEffect(() => {
  //   setSchedules([]);
  //   commonSchedules?.forEach((el: CommonSchedules) => {
  //     console.log("실행????");
  //     // console.log(el.startTime.split(" ")[0]);
  //     const temp = {
  //       title: el.title,
  //       start: el.startTime.split(" ")[0],
  //       end: el.endTime.split(" ")[0],
  //       // 시작 시간 startTime.split(" ")[1]
  //       // 마감 시간 endTime.split(" ")[1]
  //       desc: el.description,
  //       type: el.type.name,
  //       link: el.url,
  //     };
  //     setSchedules((oldSchedules) => [...oldSchedules, temp]);
  //   });
  // }, [commonSchedules]);

  return (
    <Wrapper>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={schedules}
        eventClick={handleEventClick}
        selectable={true}
        select={handleDateClick}
        unselect={handleDateClick}
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
          title={title}
          start={start}
          end={end}
          desc={desc}
          type={type}
          link={link}
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
    </Wrapper>
  );
}

export default StudyManageCalendar;
