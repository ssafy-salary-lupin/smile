// import Btn from "../components/common/ButtonBasic";
import { ReactComponent as Icon } from "../assets/icon/StudyCreatePages.svg";
import { ReactComponent as Camera } from "../assets/icon/Camera.svg";
import { ReactComponent as Users } from "../assets/icon/Users.svg";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState, useEffect, useRef, MouseEventHandler } from "react";
import { useQuery } from "react-query";
// import ButtonBasic from "../components/common/ButtonBasic";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

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

const Btn = styled.button`
  /* margin: 0 32px; */
  border-radius: 0.347vw;
  border: none;
  background-color: ${(props) => props.color};
  cursor: pointer;
  border-radius: 4px;
  padding: 0.556vw 1.111vw;
  margin: 1.111vw 1.667vw 0vw 0vw;
  width: 16.667vw;
  height: 3.473vw;
  font-size: 1.111vw;
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
    height: 11.111vw;
    width: 11.111vw;
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
  const selectType = ["미정", "면접", "자격증", "외국어"];
  const selectPeople = ["미정", "3명", "4명", "5명", "6명"];
  const selectTime = [
    "미정",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    "24:00",
  ];

  const [imgFile, setImgFile] = useState<string | ArrayBuffer>();
  const imgRef = useRef<HTMLInputElement>(null);
  const [isActive, setIsActivate] = useState<boolean>(false);

  // 이미지 업로드 input의 onChange
  const saveImgFile = () => {
    if (imgRef.current?.files !== undefined && imgRef.current?.files !== null) {
      const file = imgRef.current?.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (reader.result) {
          setImgFile(reader.result);
          // const formDatas = new FormData();
          // formDatas.append("image", imgFile);
        }
      };
      setIsActivate(true);
    }
  };

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  // 시작 시간
  const [startTime, setStartTime] = useState<Date | null>();
  // 종료 시간
  const [endTime, setEndTime] = useState<Date | null>();

  const time = startTime?.toString() + " ~ " + endTime?.toString();
  // console.log("시간 : ", time);

  const BASE_URL = `/users/studies`;

  const token = localStorage.getItem("kakao-token");
  // console.log("가져온 데이타 : ", StudyData);
  const [study_name, setStudy_name] = useState<string>("");
  const [study_typeId, setStudy_typeId] = useState<string>("");
  const [study_maxPerson, setStudy_maxPerson] = useState<string>("");
  // const [study_startDate, setStudy_startDate] = useState<string>("");
  // const [study_endDate, setStudy_endDate] = useState<string>("");
  const [study_description, setStudy_description] = useState<string>("");
  // const [study_time, setStudy_time] = useState<string>("");
  const [study_file, setStudy_file] = useState<string>("");

  useEffect(() => {
    CreateStudyApi();
  }, []);

  const CreateStudyApi = async () => {
    // async function CreateStudyApi() {
    // event.prevenDefault();

    // const handleType = (e) => {
    //   e.preventDefault();
    // };
    await axios
      .post(`${BASE_URL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        data: {
          name: study_name,
          // typeId: study_typeId,
          typeId: study_typeId,
          // maxPerson: study_maxPerson,
          maxPerson: study_maxPerson,
          startDate: changeFormat(startDate, "yyyy.MM.DD"),
          endDate: changeFormat(endDate, "yyyy.MM.DD"),
          description: study_description,
          time: time,
        },
        file: study_file,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const Change_name = (e: any) => {
    e.preventDefault();
    setStudy_name(e.target.value);
  };
  const Change_typeId = (e: any) => {
    e.preventDefault();
    // console.log(e.target.value);
    setStudy_typeId(e.target.value);
  };
  const Change_maxPerson = (e: any) => {
    e.preventDefault();
    setStudy_maxPerson(e.target.value);
  };
  const Change_startTime = (e: any) => {
    e.preventDefault();
    // console.log("선택된 start time check : ", e.target.value);
    setStartTime(e.target.value);
  };
  const Change_endTime = (e: any) => {
    e.preventDefault();
    // console.log("선택된 end time check : ", e.target.value);
    setEndTime(e.target.value);
  };
  const Change_description = (e: any) => {
    e.preventDefault();
    setStudy_description(e.target.value);
  };

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
            <InputBox value={study_name} onChange={Change_name}></InputBox>
          </SelectSmallTotal>
          <SelectSmallTotal>
            <SelectName>
              스터디 유형<RedStar>*</RedStar>
            </SelectName>
            <SelectBox onChange={Change_typeId}>
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
            <SelectBox onChange={Change_maxPerson}>
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
              <SelectBox onChange={Change_startTime}>
                {selectTime.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </SelectBox>
              <TextSmall>~</TextSmall>
              <SelectBox onChange={Change_endTime}>
                {selectTime.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </SelectBox>
              {/* <Calendar
                selected={endTime}
                onChange={(time: Date | null) => Change_endTime(time)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Time"
                dateFormat="HH:mm"
                placeholderText="미정"
              /> */}
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
            <Introudce
              value={study_description}
              onChange={Change_description}
            />
          </SelectSmallTotal>
          <BtnBox>
            {/* <Link
              to={{
                pathname: `/manage`,
              }}
            > */}
            <Btn color="#F5C82E" onClick={CreateStudyApi}>
              스터디 생성
            </Btn>
            {/* </Link> */}
            <Link
              to={{
                pathname: `/create`,
              }}
            >
              <Btn color="#314E8D">취소</Btn>
            </Link>
          </BtnBox>
        </SelectBigTotal>
      </TotalBox>
    </div>
  );
}

export default StudyCreatePages;
// export default StudyCreatePages;
export function changeFormat(date: any, format: any) {
  //moment 변환을 함수로 미리 빼 두어서 사용.
  if (moment(date).isValid()) {
    return moment(date).format(format);
  } else {
    return null;
  }
}
