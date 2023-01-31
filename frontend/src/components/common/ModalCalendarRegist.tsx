import { SetStateAction, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Close } from "../../assets/icon/Close.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale"; //한국어 설정

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
  // const [modalOpen, setModalOpen] = useState<boolean>(true);
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

  // form
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

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
          <Select name="schedule">
            <Option value="1">서류 지원</Option>
            <Option value="2">채용 공고</Option>
          </Select>
          <Title placeholder="회의 제목" />
          <Link placeholder="링크" />
          <StyledDatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            locale={ko}
          />
          <StyledDatePicker
            selected={endDate}
            onChange={(date: Date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            locale={ko}
          />
          <Desc placeholder="회의 설명"></Desc>
        </ModalConWrapper>
        <ModalBtn>
          <YellowBtn onClick={closeModal}>등록</YellowBtn>
          <CancelBtn onClick={closeModal}>취소</CancelBtn>
        </ModalBtn>
      </ModalContainer>
    </Backdrop>
  );
}
export default ModalBasic;
