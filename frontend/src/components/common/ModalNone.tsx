import React, { SetStateAction, useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface PropsType {
  children?: React.ReactNode;
  setModalOpen: React.Dispatch<SetStateAction<boolean>>;
<<<<<<< HEAD
=======
  setChange?: React.Dispatch<SetStateAction<boolean>>;
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
}

const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: fixed;
<<<<<<< HEAD
  width: 20.833vw;
  height: 13.889vw;
  z-index: 999;
  background-color: white;
  border-radius: 8px;
=======
  width: 27.778vw;
  height: 20.833vw;
  z-index: 999;
  background-color: white;
  border-radius: 0.556vw;
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
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

function ModalBasic(props: PropsType) {
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
        {/* 여기에 모달 내용 요소 props */}
        {props.children}
      </ModalContainer>
    </Backdrop>
  );
}
export default ModalBasic;
