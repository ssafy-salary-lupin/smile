import styled from "styled-components";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { useState } from "react";
import ModalCalendarMeetingView from "../common/ModalCalendarMeetingView";
import ModalCalendarCommonView from "../common/ModalCalendarCommonView";
import ModalCalendarRegist from "components/common/ModalCalendarRegist";

const Wrapper = styled.div`
  margin: 3.889vw 10.833vw;
  display: flex;
  flex-direction: column;
  padding: 0 5.556vw;
`;

function StudyManageCalendar() {
  const [MeetingModalOpen, setMeetingModalOpen] = useState<boolean>(false);
  const [CommonModalOpen, setCommonModalOpen] = useState<boolean>(false);
  const [RegistModalOpen, setRegistModalOpen] = useState<boolean>(false);

  const [type, setType] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [host, setHost] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [link, setLink] = useState<string>("");

  const handleDateClick = (arg: any) => {
    // 일정 등록 모달 띄우기
    console.log("클릭!", arg.dateStr);
    setRegistModalOpen(true);
  };

  const handleEventClick = (arg: any) => {
    if (arg.event._def.extendedProps.host) {
      // 회의 관련 모달창 띄울 때 => 참여 버튼 있는 모달창
      setMeetingModalOpen(true);
      setType(arg.event._def.extendedProps.type);
      setTitle(arg.event._def.title);
      setDate(arg.event._def.extendedProps.time);
      setHost(arg.event._def.extendedProps.host);
    } else if (arg.event._def.extendedProps.desc) {
      // 그냥 일반 일정 관련 모달창 띄울 때 => 단순 조회용 모달창
      setCommonModalOpen(true);
      setTitle(arg.event._def.title);
      setDesc(arg.event._def.extendedProps.desc);
      setType(arg.event._def.extendedProps.type);
      setLink(arg.event._def.extendedProps.link);
    }
  };

  const events = [
    {
      title: "현대오토에버",
      date: "2023-01-24",
      desc: "현대 오토에버 채용공고 입니다. 링크 안내 참고~~ 👀",
      type: "채용 공고",
      link: " https://hyundai-autoever.recruiter.co.kr/app/jobnotice/view?systemKindCode=MRS2&jobnoticeSn=129061",
    },
    {
      title: "면접 연습",
      date: "2023-01-30",
      time: "pm 7:00",
      type: "면접",
      host: "홍길동",
    },
    {
      title: "모각코해요",
      date: "2023-01-31",
      time: "pm 8:00",
      type: "일반",
      host: "홍길동",
    },
    {
      title: "LG CNS",
      date: "2023-01-20",
      desc: "LG CNS 채용공고 입니다. 링크는 알아서!!",
      type: "채용 공고",
      link: "",
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
          host={host}
        />
      )}
      {CommonModalOpen && (
        <ModalCalendarCommonView
          setModalOpen={setCommonModalOpen}
          title={title}
          desc={desc}
          type={type}
          link={link}
        />
      )}
      {RegistModalOpen && (
        <ModalCalendarRegist setModalOpen={setRegistModalOpen} />
      )}
    </Wrapper>
  );
}

export default StudyManageCalendar;
