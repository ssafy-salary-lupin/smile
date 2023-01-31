import React, { SetStateAction, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ButtonBasic from "../common/ButtonBasic";

interface PropsType {
  children?: React.ReactNode;
  setModalOpen: React.Dispatch<SetStateAction<boolean>>;
}

const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: fixed;
  width: 20.833vw;
  height: 13.889vw;
  z-index: 999;
  background-color: white;
  border-radius: 8px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Close = styled.div`
  cursor: pointer;
  position: absolute;
  right: 1.111vw;
  top: 1.111vw;
  padding: 0.556vw;
  font-size: 1.042vw;
`;

const Text = styled.div`
  font-size: 1.111vw;
`;

function ModalBasic(props: PropsType) {
  const [modalBasicClose, setModalBasicClose] = useState<boolean>(true);
  // 모달 끄기
  const closeModal = () => {
    console.log("before : ", props.setModalOpen);
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
    <Backdrop className="modalBg">
      <ModalContainer className="modalBox" ref={modalRef}>
        {/* <Close onClick={closeModal}>X</Close> */}
        {props.children}
      </ModalContainer>
    </Backdrop>
  );
}
export default ModalBasic;
