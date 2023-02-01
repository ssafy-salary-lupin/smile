// import { useEffect, useState } from "react";
// import Btn from "../components/common/ButtonBasic";
import { ReactComponent as Icon } from "../assets/icon/StudyCreatePages.svg";
import { ReactComponent as Camera } from "../assets/icon/Camera.svg";
import { ReactComponent as Users } from "../assets/icon/Users.svg";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState, useEffect, useRef } from "react";
import ButtonBasic from "../components/common/ButtonBasic";

import * as Icons from "../components/common/Icons";

const BlankSpace = styled.div`
  height: 7.383vw;
`;

const TotalBox = styled.div``;

const BetweenBox = styled.div`
  display: flex;
  justify-content: center;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TextBig = styled.div`
  font-size: 2.222vw;
  font-weight: bold;
  padding: 0.556vw;
`;

const TextSmall = styled.div`
  /* display: flex; */
  font-size: 1.111vw;
  padding: 0.556vw;
  /* justify-content: center; */
`;

const IconBox = styled(Icon)`
  width: 14vw;
  height: 14vw;
`;

const RedStar = styled.div`
  color: red;
  margin-left: 0.556vw;
  /* font-size: 20px; */
`;

const SelectName = styled.div`
  font-weight: bold;
  font-size: 1.389vw;
  padding: 1.111vw;
  display: flex;
  margin-bottom: 1.111vw;
`;

const InputBox = styled.input`
  border-right: 0vw;
  border-left: 0vw;
  border-top: 0vw;
  padding: 0.556vw;
  margin-bottom: 3.333vw;
`;

const SelectBox = styled.select`
  border-right: 0vw;
  border-left: 0vw;
  border-top: 0vw;
  padding: 0.556vw;
  margin-bottom: 3.333vw;
  width: 11.111vw;
`;

const Calendar = styled(DatePicker)`
  border-right: 0vw;
  border-left: 0vw;
  border-top: 0vw;
  display: flex;
  /* justify-content: center; */
  font-size: 1.389vw;
  margin-bottom: 3.333vw;
  width: 13.889vw;
`;

// 이름과 선택창 합친
const SelectSmallTotal = styled.div``;

// 기간과 시간
const DateTime = styled.div`
  display: flex;

  /* flex-direction: column; */
  /* justify-content: center; */
`;

// const DropZone = styled(Dropzone)``;
const CameraBox = styled(Camera)`
  width: 11.111vw;
  height: 11.111vw;
  background-color: #f2f3e6;
  margin-bottom: 5.556vw;
`;
const User = styled(Users)`
  width: 11.111vw;
  height: 11.111vw;
  background-color: #f2f3e6;
  margin-bottom: 5.556vw;
`;
// smallTotal 전부 합친것
const SelectBigTotal = styled.div`
  /* display: table; */
  /* justify-content: center; */
  /* width: 50vw; */
  margin: 0 auto;
  height: 103.472vw;
  width: 44.444vw;
  margin-bottom: 3.333vw;
`;

const Introudce = styled.input`
  height: 28.264vw;
  width: 65.625vw;
  margin-bottom: 3.333vw;
`;
// const IntroduceBox = styled.div``;
const Form = styled.form`
  .signup-profileImg-label {
    margin: 5px 0 20px 0;
    font-weight: bold;
    font-size: 13px;
    color: #0095f6;
    display: inline-block;
    cursor: pointer;
  }

  // input태그
  input[type="file"] {
    display: none;
  }
  img {
    height: 13.889vw;
    width: 13.889vw;
  }
`;

const ImgBox = styled.div`
  width: 11.111vw;
  height: 11.111vw;
  background-color: #f2f3e6;
  margin-bottom: 5.556vw;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
`;

function StudyCreatePages() {
  const selectType = ["면접", "자격증", "외국어"];
  const selectPeople = ["3명", "4명", "5명", "6명"];
  const [Selected, setSelected] = useState(" ");

  const handleSelect = (event: any) => {
    setSelected(event.target.value);
  };

  const [imgFile, setImgFile] = useState<string | ArrayBuffer>();
  const imgRef = useRef<HTMLInputElement>(null);
  const [isActive, setIsActivate] = useState<boolean>(false);

  console.log("imgRef.current : ", imgRef.current);

  // 이미지 업로드 input의 onChange
  const saveImgFile = () => {
    if (imgRef.current?.files !== undefined && imgRef.current?.files !== null) {
      const file = imgRef.current?.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (reader.result) {
          setImgFile(reader.result);
        }
      };
      setIsActivate(true);
    }
  };

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  // 시작 시간
  const [startTime, setStartTime] = useState<Date | null>(new Date());
  // 종료 시간
  const [endTime, setEndTime] = useState<Date | null>(new Date());
  return (
    <div>
      {/* <CreateContainer> */}
      <BlankSpace />
      <TotalBox>
        <BetweenBox>
          <TextBox>
            <TextBig>원하는 스터디를 생성해보세요!</TextBig>
            <TextSmall>
              규정에 위반 되는 스터디는 생성 시 즉시 법적 대응을 하겠습니다.
            </TextSmall>
          </TextBox>
          <IconBox />
        </BetweenBox>
        <SelectBigTotal>
          <SelectSmallTotal>
            <SelectName>
              스터디 이름<RedStar>*</RedStar>
            </SelectName>
            <InputBox></InputBox>
          </SelectSmallTotal>
          <SelectSmallTotal>
            <SelectName>
              스터디 유형<RedStar>*</RedStar>
            </SelectName>
            <SelectBox onChange={handleSelect} value={Selected}>
              {selectType.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </SelectBox>
          </SelectSmallTotal>
          <SelectSmallTotal>
            <SelectName>
              모집 인원<RedStar>*</RedStar>
            </SelectName>
            <SelectBox onChange={handleSelect} value={Selected}>
              {selectPeople.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </SelectBox>
          </SelectSmallTotal>
          <SelectSmallTotal>
            <SelectName>기간</SelectName>
            {/* <SelectBox></SelectBox> */}
            <DateTime>
              <Calendar
                dateFormat="yyyy년 MM월 dd일"
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
                selectsStart
                minDate={new Date()}
                startDate={startDate}
                endDate={endDate}
              />
              ~
              <Calendar
                dateFormat="yyyy년 MM월 dd일"
                selected={endDate}
                onChange={(date: Date) => setEndDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
              />
            </DateTime>
          </SelectSmallTotal>
          <SelectSmallTotal>
            <SelectName>스터디 시간</SelectName>
            <DateTime>
              <Calendar
                selected={startTime}
                onChange={(time: Date | null) => setStartTime(time)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
              <TextSmall>~</TextSmall>
              <Calendar
                selected={endTime}
                onChange={(time: Date | null) => setEndTime(time)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </DateTime>
          </SelectSmallTotal>
          <SelectSmallTotal>
            <SelectName>대표 이미지</SelectName>
            <Form>
              <label className="signup-profileImg-label" htmlFor="profileImg">
                <ImgBox>
                  {isActive && typeof imgFile == "string" ? (
                    <img src={imgFile} alt="" />
                  ) : (
                    <Icons.Users />
                  )}
                </ImgBox>
              </label>
              <input
                className="signup-profileImg-input"
                type="file"
                accept="image/*"
                id="profileImg"
                onChange={saveImgFile}
                ref={imgRef}
              />
            </Form>
          </SelectSmallTotal>
          <SelectSmallTotal>
            <SelectName>스터디 설명</SelectName>
            <Introudce />
          </SelectSmallTotal>
          <BtnBox>
            {/* <ButtonBasic
              bgColor="yellow"
              // Color="Yellow"
              text="스터디 생성"
              setModalBasicClose={true}
            />
            <ButtonBasic
              bgColor="blue"
              text="취소"
              setModalBasicClose={false}
            /> */}
          </BtnBox>
        </SelectBigTotal>
      </TotalBox>
    </div>
  );
}

export default StudyCreatePages;
