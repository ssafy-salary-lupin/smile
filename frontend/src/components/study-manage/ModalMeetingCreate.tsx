import { SetStateAction, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Close } from "../../assets/icon/Close.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { MeetingCreateApi } from "apis/StudyManageMeetingApi";

interface PropsType {
  setModalOpen: React.Dispatch<SetStateAction<boolean>>;
}

const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
  position: fixed;
  width: 28.889vw;
  height: 16.667vw;
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
  height: 20%;
  width: 100%;
  border-radius: 0.556vw 0.556vw 0 0;
  display: flex;
  flex-direction: row;
  padding: 0.556vw;
`;

const Space = styled.div`
  width: 90%;
  height: 100%;
  color: ${(props) => props.theme.blackColorOpacity2};
  font-size: 1.25vw;
  vertical-align: middle;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 2.639vw;
  font-weight: 600;
`;

const CloseBtn = styled.div`
  width: 7%;
  height: 100%;
  cursor: pointer;
  padding: 0.25vw;
`;

const ModalConWrapper = styled.div`
  height: 60%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2vw 2.639vw;
  /* border-bottom: 1px solid ${(props) => props.theme.blackColorOpacity}; */
  /* align-items: center; */
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5vw 0.5vw;
  border-radius: 0.25vw;
  border: 0.05vw solid ${(props) => props.theme.blackColorOpacity};
  color: ${(props) => props.theme.blackColorOpacity2};
  font-size: 0.833vw;
  margin-bottom: 0.5vw;
`;

const Option = styled.option`
  /* background-color: black; */
  font-size: 0.833vw;
  color: ${(props) => props.theme.blackColorOpacity2};
  li {
    &:hover {
      background-color: black;
    }
  }
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  border: 1px solid ${(props) => props.theme.blackColorOpacity};
  border-radius: 0.25vw;
  font-size: 0.833vw;
  line-height: 100%;
  padding: 0.5vw 0.5vw;
  background-color: transparent;
  color: ${(props) => props.theme.blackColorOpacity2};
  margin-bottom: 0.5vw;
`;

const Title = styled.input`
  width: 100%;
  border: 1px solid ${(props) => props.theme.blackColorOpacity};
  padding: 0.5vw 0.5vw;
  border-radius: 0.25vw;
  margin-bottom: 0.5vw;
  font-size: 0.833vw;
`;

const ModalBtnBox = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.5vw 0;
  background-color: ${(props) => props.theme.pointColor};
  border-radius: 0 0 0.556vw 0.556vw;
`;

const ModalBtn = styled.button`
  border: none;
  color: white;
  background-color: transparent;
  cursor: pointer;
  font-size: 0.972vw;
`;

export interface IRegistData {
  meetingName: string;
  meetingTypeId: number;
}

function ModalMeetingCreate(props: PropsType) {
  // 모달 관련 코드 ======================================
  const closeModal = () => {
    props.setModalOpen(false);
  };
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        props.setModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  // =====================================================

  // 회의 유형
  const [type, setType] = useState<number>(0);
  const handleType = (e: any) => {
    setType(Number(e.target.value));
  };

  // 회의 제목
  const [title, setTitle] = useState<string>("");
  const handleTitle = (e: any) => {
    setTitle(e.target.value);
  };

  // 회의 기간, 시간
  const [startDate, setStartDate] = useState<Date>(new Date());
  console.log(
    "startDate : ",
    startDate.getFullYear().toString() +
      "-" +
      ("0" + (startDate.getMonth() + 1)).slice(-2).toString() +
      "-" +
      ("0" + startDate.getDate()).slice(-2).toString() +
      " " +
      ("0" + startDate.getHours()).slice(-2).toString() +
      ":" +
      ("0" + startDate.getMinutes()).slice(-2).toString(),
  );

  // 회의 생성
  const registData = {
    meetingName: title, // 생성할 회의 이름
    meetingTypeId: type, // 생성할 회의 식별자 번호
  };

  const createMeeting = async () => {
    // 모달 창 닫기
    if (type === undefined || type < 1) {
      alert(" 유형을 선택 하세요. ");
      return;
    }
    if (title === undefined || title === "") {
      alert(" 제목을 입력 하세요. ");
      return;
    }

    const response = await MeetingCreateApi(registData);
    console.log(response);

    if (response.data.code === 200) {
    } else {
      alert(response.data.message);
    }
    closeModal();
  };

  return (
    <Backdrop>
      <ModalContainer ref={modalRef}>
        <ModalHead>
          <Space>
            <p>Meeting</p>
          </Space>
          <CloseBtn onClick={closeModal}>
            <Close width="100%" height="100%" fill="#0000007b" />
          </CloseBtn>
        </ModalHead>
        <ModalConWrapper>
          <Select name="meeeting" onChange={handleType}>
            <Option value="0">-- 유형 --</Option>
            <Option value="1">일반</Option>
            <Option value="2">면접</Option>
          </Select>
          <Title placeholder="회의 제목" onChange={handleTitle} />
          <StyledDatePicker
            selected={startDate}
            dateFormat="yyyy-MM-dd HH:mm"
            onChange={(date: Date) => setStartDate(date)}
            selectsStart
            locale={ko}
            showTimeSelect
          />
        </ModalConWrapper>
        <ModalBtnBox>
          <ModalBtn onClick={createMeeting}>회의 생성하기 →</ModalBtn>
        </ModalBtnBox>
      </ModalContainer>
    </Backdrop>
  );
}
export default ModalMeetingCreate;
