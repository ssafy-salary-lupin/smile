import React, { SetStateAction, useState } from "react";
import styled from "styled-components";
import "../../assets/css/index.css";

// const Btn = styled.div`
//   justify-content: space-between;
//   padding: 1.5rem;
// `;
const ButtonWrapper = styled.div`
  height: 5.556vw;
`;
const Btn = styled.button`
  cursor: pointer;
  border-radius: 4px;
  padding: 0.556vw 1.111vw;
  /* background-color: var(--clr-primary-1); */
  color: white;
  border: 0;
  margin: 1.111vw 1.667vw 0vw 0vw;
  width: 6.944vw;
  height: 3.473vw;
  font-size: 1.111vw;
`;

const BlueBtn = styled.button`
  cursor: pointer;
  border-radius: 4px;
  padding: 0.556vw 1.111vw;
  background-color: var(--clr-primary-2);
  color: white;
  border: 0;
  width: 6.944vw;
  height: 3.473vw;
  font-size: 1.111vw;
`;
interface PropsType {
  setModalBasicClose: React.Dispatch<SetStateAction<boolean>>;
  bgColor?: string;
  text?: string;
  color?: string;
}

function ButtonBasic(props: PropsType) {
  const closeModal = () => {
    props.setModalBasicClose(false);
  };
  // const { backgroundColor, text, color } = props;
  return (
    <ButtonWrapper>
      <Btn
        // bgColor={props.bgColor}
        color={props.color}
        // setModalBasicClose={props.setModalBasicClose}
      >
        {props.text}
      </Btn>
    </ButtonWrapper>
  );
}
export default ButtonBasic;
