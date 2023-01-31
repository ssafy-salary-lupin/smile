import styled from "styled-components";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { useState } from "react";
import ModalCalendarMeetingView from "../common/ModalCalendarMeetingView";
import ModalCalendarCommonView from "../common/ModalCalendarCommonView";

const Wrapper = styled.div`
  margin: 0 10.833vw;
  display: flex;
  flex-direction: column;
`;

function StudyManageCalendar() {
  const [MeetingModalOpen, setMeetingModalOpen] = useState<boolean>(false);
  const [CommonModalOpen, setCommonModalOpen] = useState<boolean>(false);

  const [type, setType] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [desc, setDesc] = useState<string>("");

  const handleDateClick = (arg: any) => {
    // 일정 등록 모달 띄우기
  };

  const handleEventClick = (arg: any) => {
    if (arg.event._def.extendedProps.type) {
      // 회의 관련 모달창 띄울 때 => 참여 버튼 있는 모달창
      setMeetingModalOpen(true);
      // console.log(arg.event);
      setType(arg.event._def.extendedProps.type);
      setTitle(arg.event._def.title);
      setDate(arg.event._def.extendedProps.time);
    } else if (arg.event._def.extendedProps.desc) {
      // 그냥 일반 일정 관련 모달창 띄울 때 => 단순 조회용 모달창
      setCommonModalOpen(true);
      setTitle(arg.event._def.title);
      setDesc(arg.event._def.extendedProps.desc);
    }
  };

  const events = [
    {
      title: "채용 1",
      date: "2023-01-24",
      desc: "현대 오토에버 채용 공고입니다.",
    },
    {
      title: "면접 연습",
      date: "2023-01-30",
      time: "2023년 01월 30일",
      type: "면접",
    },
    {
      title: "채용 2",
      date: "2023-01-30",
      desc: "LG CNS 채용 공고 입니다.",
    },
    {
      title: "모각코해요",
      date: "2023-01-31",
      time: "2023년 01월 31일",
      type: "일반",
    },
  ];

  return (
    // class => fc-daygrid-day-events

    <Wrapper>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />
      {MeetingModalOpen && (
        <ModalCalendarMeetingView
          setModalOpen={setMeetingModalOpen}
          type={type}
          title={title}
          date={date}
        />
      )}
      {CommonModalOpen && (
        <ModalCalendarCommonView
          setModalOpen={setCommonModalOpen}
          title={title}
          desc={desc}
        />
      )}
    </Wrapper>
  );
}

export default StudyManageCalendar;
