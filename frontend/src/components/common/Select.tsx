import React from "react";
import { useState } from "react";
import styled, { keyframes } from "styled-components";
import "./test.css";
import CheckBoxTrue from "./Icons/CheckBoxTrue.svg";
import BlankSpace from "./BlankSpace";
import { Set } from "typescript";

const SSelectContainer = styled.div<{ isActive: boolean }>`
  position: relative;
  width: 195px;
  height: 48px;
  border-radius: 10px;
  border: 2px solid #2551b3;
  /* background: url("https://freepikpsd.com/media/2019/10/down-arrow-icon-png-7-Transparent-Images.png")
    calc(100% - 7px) center no-repeat; */
  /* background-size: 20px; */
  cursor: pointer;
  * {
    box-sizing: border-box;
  }
  ::after {
    /* content: ""; */
    display: block;
    width: 2px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 35px;
    background: lightcoral;
  }

  ul {
    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: #303030;
      border-radius: 45px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #303030;
    }
    ${(props) =>
      props.isActive ? "max-height: 500px" : "transition: 0.3s ease-out"}
  }
  li {
    :hover {
      /* background: rgb(175, 93, 93); */
      /* color: #2551b3; */
    }
    :last-child {
      border-bottom: 0 none;
    }
  }
`;

const SLabelBtn = styled.button`
  display: flex;
  align-items: center;
  width: inherit;
  height: inherit;
  border: 0 none;
  outline: 0 none;
  padding-left: 15px;
  background: transparent;
  cursor: pointer;
`;

const SOptionList = styled.ul`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  top: 50px;
  left: 0;
  width: 100%;
  height: 200px;
  /* background: lightcoral; */
  background: white;
  color: black;
  list-style-type: none;
  padding: 0;
  /* padding: 28px 54px; */
  border-radius: 6px;
  overflow: hidden;
  max-height: 0;
  transition: 0.3s ease-in;
  border: 1px solid rgba(0, 0, 0, 0.5);
`;

const Color = keyframes`
  from {
    
  }
  to {
    color: #2551b3;
  }
`;
const InputColor = keyframes`
  from {
    
  }
  to {
    border: 2px solid #2551b3;
  }
`;

const SOptionContainer = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  margin-left: 32px;
  :hover {
    /* color: #2551b3; */
    animation: ${Color} 1s forwards;
    input {
      /* border: 2px solid #2551b3; */
      animation: ${InputColor} 1s forwards;
    }
  }
`;

const SSelectInput = styled.input.attrs({
  type: "checkbox",
})`
  appearance: none;
  border: 2px solid rgba(0, 0, 0, 0.5);
  border-radius: 0.35rem;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;

  :checked {
    background-color: #0b63e5;
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
  }
`;

const SOptionItem = styled.label`
  /* border-bottom: 1px dashed rgb(170, 72, 72); */
  padding: 5px 15px 5px;
  margin: 16px 0px;
  transition: 0.1s;
  font-size: 16px;
  /* font-weight: 600; */
`;

function Select(optionList: Array) {
  const [checkedList, setCheckedList] = useState<number[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  // const optionList = ["면접", "자격증", "외국어"];
  const onClickLabel = () => {
    setIsActive(!isActive);
  };
  const checkedItemHandler = (value: number, isChecked: boolean) => {
    if (isChecked) {
      setCheckedList((prev) => [...prev, value]);
      return;
    }
    if (!isChecked && checkedList.includes(value)) {
      setCheckedList(checkedList.filter((item) => item !== value));
      return;
    }
    return;
  };

  const checkHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: number,
  ) => {
    setIsChecked(!isChecked);
    checkedItemHandler(value, e.target.checked);
  };
  console.log(checkedList);
  return (
    <SSelectContainer isActive={isActive}>
      <SLabelBtn onClick={onClickLabel}>버튼</SLabelBtn>
      <SOptionList>
        {optionList.map((optionItem, index) => (
          <SOptionContainer>
            <SSelectInput
              key={index + 1}
              id={optionItem}
              checked={checkedList.includes(index + 1)}
              onChange={(e) => checkHandler(e, index + 1)}
            />
            <SOptionItem key={index} htmlFor={optionItem}>
              {optionItem}
            </SOptionItem>
          </SOptionContainer>
        ))}
      </SOptionList>
    </SSelectContainer>
  );
}

export default Select;
