import { SetStateAction, useEffect, useRef } from "react";
import styled from "styled-components";

interface PropsType {
  setModalOpen: React.Dispatch<SetStateAction<boolean>>;
  title: string;
  desc: string;
}

const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
        <ModalTitle>
          <p>{props.title}</p>
        </ModalTitle>
        <ModalContent>
          <Date>
            <Input placeholder="회의 설명" disabled value={props.desc} />
          </Date>
        </ModalContent>
        <div>
          <BlueBtn onClick={closeModal}>취소</BlueBtn>
        </div>
      </ModalContainer>
    </Backdrop>
  );
}
export default ModalBasic;
