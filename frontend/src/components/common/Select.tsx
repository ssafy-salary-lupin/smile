import React, { useEffect } from "react";
import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useRecoilState } from "recoil";
import { SearchTypeState } from "atoms/SearchAtom";

const Color = keyframes`
  from {
    
  }
  to {
    color: #2551b3;
  }
`;
const SelectColor = keyframes`
  from {
    
  }
  to {
    border: 2px solid #2551b3;
  }
`;
const InputColor = keyframes`
  from {
    
  }
  to {
    border: 2px solid #2551b3;
  }
`;
const fold = keyframes`
  0% {
    
  }
  99% {

  }
  100% {
    border: none;
  }
`;

const SSelectContainer = styled.div<{ isActive: boolean }>`
  position: relative;
  width: 13.542vw;
  height: 4vw;
  border-radius: 0.694vw;

  border: 2px solid rgba(0, 0, 0, 0.5);
  /* background: url("https://freepikpsd.com/media/2019/10/down-arrow-icon-png-7-Transparent-Images.png")
  calc(100% - 7px) center no-repeat; */
  /* background-size: 20px; */
  cursor: pointer;
  ${(props) => (props.isActive ? "border: 2px solid #2551b3;" : null)}
  @media screen and (min-width: 1280px) {
    width: 146.256px;
    height: 40px;
    border-radius: 7.498px;
  }
  :hover {
    animation: ${SelectColor} 1s forwards;
  }
  * {
    box-sizing: border-box;
  }
  /* 중앙 분리 선 만들기 */
  /* ::after {
    content: "";
    display: block;
    width: 2px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 35px;
    background: lightcoral;
  } */

  ul {
    ::-webkit-scrollbar {
      width: 0.417vw;
      @media screen and (min-width: 1280px) {
        width: 4.502px;
      }
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: #303030;
      border-radius: 3.125vw;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #303030;
    }
    ${(props) =>
      props.isActive ? "max-height: 500px;" : "transition: 0.7s ease-out;"};
    animation: ${(props) => (props.isActive ? null : fold)} 1s forwards;
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
  button {
    color: ${(props) => (props.isActive ? "#2551b3" : "black")};

    :hover {
      animation: ${Color} 1s forwards;
    }
  }
`;

const SLabelBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: inherit;
  height: inherit;
  border: 0 none;
  outline: 0 none;
  /* padding-left: 1.042vw; */
  background: transparent;
  cursor: pointer;
  font-size: 2vw;
  font-weight: 600;
  @media screen and (min-width: 1280px) {
    font-size: 15.005px;
    /* padding-left: 11.251px; */
  }
`;

const SOptionList = styled.ul`
  position: absolute;

  left: 0;
  width: 100%;
  background: white;
  color: black;
  list-style-type: none;
  padding: 0;
  border-radius: 0.417vw;
  overflow: hidden;
  max-height: 0;
  transition: 0.7s ease-in;
  border: 1px solid rgba(0, 0, 0, 0.5);
  margin: 0;
  z-index: 9999;
`;

const SOptionContainer = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  margin-left: 2.222vw;
  :hover {
    /* color: #2551b3; */
    animation: ${Color} 1s forwards;
    input {
      /* border: 2px solid #2551b3; */
      animation: ${InputColor} 1s forwards;
    }
  }
`;

// 체크 박스
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

// 선택 내용
const SOptionItem = styled.label`
  /* border-bottom: 1px dashed rgb(170, 72, 72); */
  padding: 0.347vw 1.042vw 0.347vw;
  margin: 1.111vw 0px;
  transition: 0.1s;
  font-size: 1.111vw;
  cursor: pointer;
  @media screen and (min-width: 1280px) {
    padding: 3.744px 11.251px 3.744px;
    margin: 12px 0vw;
    font-size: 12px;
  }
`;

interface ISelectProps {
  optionObj: {
    optionTitle: string;
    optionList: string[];
  };
}

function Select(props: ISelectProps) {
  // 체크된 Type이 담기는 리스트
  // const [checkedList, setCheckedList] = useState<number[]>([]);
  // 체크 여부 확인
  const [isChecked, setIsChecked] = useState<boolean>(false);
  // hover 여부 확인
  const [isActive, setIsActive] = useState<boolean>(false);

  const [checkedList, setCheckedList] =
    useRecoilState<number[]>(SearchTypeState);

  // useEffect(() => {
  //   first

  // }, [checkedList])

  console.log(checkedList);

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

  const searchTypeStateHandler = () => {};

  const checkHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: number,
  ) => {
    setIsChecked(!isChecked);
    checkedItemHandler(value, e.target.checked);
    searchTypeStateHandler();
  };
  return (
    <SSelectContainer isActive={isActive}>
      <SLabelBtn onClick={onClickLabel}>
        {props.optionObj.optionTitle}
      </SLabelBtn>
      {/* {isActive && ( */}
      <SOptionList>
        {props.optionObj.optionList.map((optionItem, index) => (
          <SOptionContainer key={index + 1}>
            <SSelectInput
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
      {/* )} */}
    </SSelectContainer>
  );
}

export default Select;
