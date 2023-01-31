import { SetStateAction, useEffect, useRef } from "react";
import styled from "styled-components";

interface PropsType {
  setModalOpen: React.Dispatch<SetStateAction<boolean>>;
  type: string;
  title: string;
  date: string;
}

const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
  position: fixed;
  width: 27.778vw;
  height: 20.556vw;
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
  height: 14%;
  width: 100%;
  background-color: ${(props) => props.theme.pointColor};
  margin-bottom: 2vw;
  border-radius: 0.556vw 0.556vw 0 0;
`;

const XBtn = styled.div``;

const ModalConWrapper = styled.div`
  height: 86%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalTitle = styled.div`
  margin-bottom: 2vw;
  p {
    font-weight: 500;
    font-size: 1.5vw;
  }
`;

const ModalContent = styled.div`
  width: 100%;
  padding: 0 3vw;
  display: flex;
  flex-direction: column;
`;

const Type = styled.div`
  text-align: center;
  width: 100%;
  margin-bottom: 1vw;
`;

const Title = styled.div`
  text-align: center;
  margin-bottom: 1vw;
`;

const Date = styled.div`
  text-align: center;
  margin-bottom: 1vw;
`;

const Input = styled.input`
  border: 0.125vw solid ${(props) => props.theme.shadowColor};
  padding: 0.349vw 0.599vw;
  width: 100%;
  border-radius: 0.267vw;
  font-size: 1vw;
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

const BlueBtn = styled.button`
  cursor: pointer;
  border-radius: 0.25vw;
  padding: 0.5vw 1vw;
  background-color: ${(props) => props.theme.pointColor};
  color: ${(props) => props.theme.whiteColor};
  border: 0;
  font-size: 1vw;
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
  return (
    <Backdrop>
      <ModalContainer ref={modalRef}>
        <ModalHead>
          <XBtn></XBtn>
        </ModalHead>
        <ModalConWrapper>
          <ModalTitle>
            <p>스터디 참여</p>
          </ModalTitle>
          <ModalContent>
            <Type>
              <Input placeholder="회의 유형" disabled value={props.type} />
            </Type>
            <Title>
              <Input placeholder="회의 제목" disabled value={props.title} />
            </Title>
            <Date>
              <Input placeholder="회의 날짜" disabled value={props.date} />
            </Date>
          </ModalContent>
          <div>
            <YellowBtn>참여</YellowBtn>
            <BlueBtn onClick={closeModal}>취소</BlueBtn>
          </div>
        </ModalConWrapper>
      </ModalContainer>
    </Backdrop>
  );
}
export default ModalBasic;
