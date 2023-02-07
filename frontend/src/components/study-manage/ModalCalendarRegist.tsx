import { SetStateAction, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Close } from "../../assets/icon/Close.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale"; //한국어 설정

interface PropsType {
  setModalOpen: React.Dispatch<SetStateAction<boolean>>;
  selectStart: string;
  selectEnd: string;
  onRegist: Function;
}

export interface IRegistData {
  scheduleTypeId: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  url: string;
  // color : color,
  // textColor : "#000000"
}

const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
  position: fixed;
  width: 28.889vw;
  height: 36.111vw;
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
  height: 10%;
  width: 100%;
  background-color: ${(props) => props.theme.blackColorOpacity3};
  border-radius: 0.556vw 0.556vw 0 0;
  display: flex;
  flex-direction: row;
  padding: 0.556vw;
`;

const Space = styled.div`
  width: 90%;
  height: 100%;
  color: ${(props) => props.theme.blackColor};
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
  height: 83%;
  width: 100%;
  padding: 2vw 5vw;
  border-bottom: 1px solid ${(props) => props.theme.blackColorOpacity};
  /* align-items: center; */
  display: flex;
  flex-direction: column;
  align-items: center;
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

const Title = styled.input`
  width: 100%;
  border: 1px solid ${(props) => props.theme.blackColorOpacity};
  padding: 0.5vw 0.5vw;
  border-radius: 0.25vw;
  margin-bottom: 0.5vw;
  font-size: 0.833vw;
`;

const Link = styled(Title)``;

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

const Desc = styled.textarea`
  width: 100%;
  border: 1px solid ${(props) => props.theme.blackColorOpacity};
  resize: none;
  height: 9.444vw;
  margin-bottom: 0.5vw;
`;

const ColorBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

const Red = styled.div`
  cursor: pointer;
  width: 2vw;
  height: 2vw;
  border-radius: 50%;
  background-color: #ffa8a8;
  margin: 0 0.5vw;
  &:hover {
    background-color: #dc9393;
  }
`;

const Yellow = styled(Red)`
  background-color: #ffff8c;
  &:hover {
    background-color: #dada79;
  }
`;

const Green = styled(Red)`
  background-color: #99ff99;
  &:hover {
    background-color: #81d681;
  }
`;

const Blue = styled(Red)`
  background-color: #a5e2ff;
  &:hover {
    background-color: #8dc0d8;
  }
`;

const Gray = styled(Red)`
  background-color: #c9c9c9;
  &:hover {
    background-color: #a1a0a0;
  }
`;

const ModalBtn = styled.div`
  width: 100%;
  height: 12%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 0.833vw 0;
`;

const YellowBtn = styled.button`
  cursor: pointer;
  border-radius: 0.25vw;
  padding: 0.5vw 1vw;
  background-color: ${(props) => props.theme.blackColorOpacity2};
  color: ${(props) => props.theme.whiteColor};
  border: 0;
  margin-right: 1vw;
  font-size: 1vw;
`;

const CancelBtn = styled(YellowBtn)`
  background-color: ${(props) => props.theme.whiteColor};
  border: 1px solid ${(props) => props.theme.blackColorOpacity2};
  color: ${(props) => props.theme.blackColorOpacity2};
`;

function ModalBasic(props: PropsType) {
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

  // form
  const [startDate, setStartDate] = useState<Date>(new Date(props.selectStart));
  const [endDate, setEndDate] = useState<Date>(new Date(props.selectEnd));
  const [type, setType] = useState<number>();
  const [title, setTitle] = useState<string>();
  const [link, setLink] = useState<string>();
  const [desc, setDesc] = useState<string>();
  const [color, setColor] = useState<string>("#ffff8c");

  // data set ===============================
  const handleType = (e: any) => {
    setType(e.target.value);
  };

  const handleTitle = (e: any) => {
    setTitle(e.target.value);
  };

  const handleLink = (e: any) => {
    setLink(e.target.value);
  };

  const handleDesc = (e: any) => {
    setDesc(e.target.value);
  };

  const handleColor = (e: string) => {
    setColor(e);
  };
  // =========================================

  const registData = {
    scheduleTypeId: type, // 스케쥴 식별자 == 유형
    title: title,
    description: desc,
    startTime:
      startDate.getFullYear().toString() +
      "-" +
      ("0" + (startDate.getMonth() + 1)).slice(-2).toString() +
      "-" +
      ("0" + startDate.getDate()).slice(-2).toString() +
      " " +
      ("0" + startDate.getHours()).slice(-2).toString() +
      ":" +
      ("0" + startDate.getMinutes()).slice(-2).toString(),
    endTime:
      new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() + 1)
        .getFullYear()
        .toString() +
      "-" +
      (
        "0" +
        (new Date(
          endDate.getFullYear(),
          endDate.getMonth(),
          endDate.getDate() + 1,
        ).getMonth() +
          1)
      )
        .slice(-2)
        .toString() +
      "-" +
      (
        "0" +
        new Date(
          endDate.getFullYear(),
          endDate.getMonth(),
          endDate.getDate() + 1,
        ).getDate()
      )
        .slice(-2)
        .toString() +
      " " +
      (
        "0" +
        new Date(
          endDate.getFullYear(),
          endDate.getMonth(),
          endDate.getDate() + 1,
        ).getHours()
      )
        .slice(-2)
        .toString() +
      ":" +
      (
        "0" +
        new Date(
          endDate.getFullYear(),
          endDate.getMonth(),
          endDate.getDate() + 1,
        ).getMinutes()
      )
        .slice(-2)
        .toString(),
    url: link,
    // color : color,
    // textColor : "#000000"
  };

  const RegistSchedule = () => {
    // form 빈칸 체크
    if (type === undefined || type < 1) {
      alert(" 유형을 선택 하세요. ");
      return;
    }
    if (title === undefined || title === "") {
      alert(" 제목을 입력 하세요. ");
      return;
    }
    if (desc === undefined || desc === "") {
      alert(" 내용을 입력 하세요. ");
      return;
    }

    console.log("보내기전에 data 체크 : ", registData);

    // 일정 등록 메소드 실행
    props.onRegist(registData);
    closeModal();
  };

  return (
    <Backdrop>
      <ModalContainer ref={modalRef}>
        <ModalHead>
          <Space>
            <p>일정 등록</p>
          </Space>
          <CloseBtn onClick={closeModal}>
            <Close width="100%" height="100%" fill="black" />
          </CloseBtn>
        </ModalHead>
        <ModalConWrapper>
          <Select name="schedule" onChange={handleType}>
            <Option value="0">-- 유형 --</Option>
            <Option value="1">서류 지원</Option>
            <Option value="2">채용 공고</Option>
          </Select>
          <Title placeholder="회의 제목" onChange={handleTitle} />
          <Link placeholder="URL" onChange={handleLink} />
          <StyledDatePicker
            selected={startDate}
            dateFormat="yyyy-MM-dd HH:mm"
            onChange={(date: Date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            locale={ko}
            showTimeSelect
          />
          <StyledDatePicker
            selected={endDate}
            dateFormat="yyyy-MM-dd HH:mm"
            onChange={(date: Date) => {
              setEndDate(date);
            }}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            locale={ko}
            showTimeSelect
          />
          <Desc placeholder="회의 설명" onChange={handleDesc}></Desc>
          <ColorBox>
            <Yellow
              onClick={() => {
                handleColor("#ffff8c");
              }}
            ></Yellow>
            <Red onClick={() => handleColor("#ffa8a8")}></Red>
            <Gray onClick={() => handleColor("#c9c9c9")}></Gray>
            <Blue onClick={() => handleColor("#a5e2ff")}></Blue>
            <Green onClick={() => handleColor("#99ff99")}></Green>
          </ColorBox>
        </ModalConWrapper>
        <ModalBtn>
          <YellowBtn onClick={RegistSchedule}>등록</YellowBtn>
          <CancelBtn onClick={closeModal}>취소</CancelBtn>
        </ModalBtn>
      </ModalContainer>
    </Backdrop>
  );
}
export default ModalBasic;
