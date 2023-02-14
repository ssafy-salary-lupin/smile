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
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import * as Icons from "../components/common/Icons";
import { CreateStudyApi, studyTypeApi } from "apis/StudyCreateApi";
import Swal from "sweetalert2";

const BlankSpace = styled.div`
  height: 7.383vw;
`;

const TotalBox = styled.div`
  margin: 0 21.111vw;
  display: flex;
  flex-direction: column;
  a,
  a:link,
  a:visited,
  a:hover,
  a:active {
    text-decoration: none;
    color: inherit;
  }
`;

const BetweenBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 3.889vw;
`;

const TextBig = styled.div`
  font-size: 2.222vw;
  font-weight: bold;
  padding: 0.556vw;
  margin-bottom: 1.111vw;
`;

const TextSmall = styled.div`
  /* display: flex; */
  font-size: 1.111vw;
  padding: 0.556vw;
  /* justify-content: center; */
`;

const IconBox = styled(Icon)`
  width: 16.667vw;
  height: 16.667vw;
`;

const RedStar = styled.div`
  color: red;
  margin-left: 0.556vw;
  /* font-size: 20px; */
`;

const SelectName = styled.div`
  font-weight: bold;
  font-size: 1.389vw;
  padding: 1.111vw 0;
  display: flex;
  margin-bottom: 1.111vw;
`;

const InputBox = styled.input`
  width: 50%;
  outline: none;
  font-size: 1.111vw;
  border-right: 0vw;
  border-left: 0vw;
  border-top: 0vw;
  padding: 0.556vw;
  /* margin-bottom: 3.333vw; */
`;

// smallTotal 전부 합친것
const SelectBigTotal = styled.div`
  /* display: table; */
  /* justify-content: center; */
  /* width: 50vw; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0 auto;
  height: 103.472vw;
  width: 100%;
  padding: 0 1.667vw;
  /* margin-bottom: 3.333vw; */
`;

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

// 기간과 시간
const DateTime = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  align-items: center;

  p {
    padding: 0;
    margin: 0 0.556vw;
  }

  /* flex-direction: column; */
  /* justify-content: center; */
`;

const TimeSelectWrapper = styled.div`
  /* width: 100%; */
`;

const SelectBox = styled.select`
  padding: 0.556vw;
  /* margin-bottom: 3.333vw; */
  width: 15.556vw;
  border: none;
  outline: none;
  border-bottom: 1px solid black;
  font-size: 1.111vw;
`;

const CalendarBox = styled.div``;

const Calendar = styled(DatePicker)`
  border: none;
  outline: none;
  border-bottom: 1px solid black;
  padding: 0.556vw;
  /* display: flex; */
  /* justify-content: center; */
  font-size: 1.111vw;
  /* margin-bottom: 3.333vw; */
  width: 100%;
`;

const CreateBtn = styled.button`
  border-radius: 0.417vw;
  border: none;
  background-color: ${(props) => props.theme.mainColor};
  cursor: pointer;
  padding: 0.556vw 1.111vw;
  margin: 1.111vw 1.667vw 0vw 0vw;
  width: 16.667vw;
  height: 3.473vw;
  font-size: 1.111vw;
  font-weight: bold;
  box-shadow: 2.002px 2.002px 2.002px
    ${(props) => props.theme.blackColorOpacity4};
`;

const CancelBtn = styled(CreateBtn)`
  background-color: ${(props) => props.theme.pointColor};
  color: white;
`;

// const Btn = styled.button`
//   border-radius: 0.417vw;
//   border: none;
//   background-color: ${(props) => props.color};
//   cursor: pointer;
//   padding: 0.556vw 1.111vw;
//   margin: 1.111vw 1.667vw 0vw 0vw;
//   width: 16.667vw;
//   height: 3.473vw;
//   font-size: 1.111vw;
//   font-weight: bold;
//   box-shadow: 2.002px 2.002px 2.002px
//     ${(props) => props.theme.blackColorOpacity4};
// `;

// 이름과 선택창 합친
const SelectSmallTotal = styled.div`
  margin-bottom: 3.889vw;
  width: 100%;
  display: flex;
  flex-direction: column;
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

const Introudce = styled.textarea`
  height: 28.264vw;
  width: 100%;
  outline: none;
  padding: 1.667vw;
  /* margin-bottom: 3.333vw; */
  resize: none;
`;
// const IntroduceBox = styled.div``;
const Forms = styled.form`
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
  /* margin-bottom: 5.556vw; */
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
`;

interface StudyType {
  isSuccess: true;
  code: 200;
  message: "요청에 성공했습니다.";
  result: {
    types: [
      {
        id: number; // 스터디 유형 식별자
        name: string; // 스터디 유형 이름
      },
      {
        id: number;
        name: string;
      },
      {
        id: number;
        name: string;
      },
    ];
  };
}

function StudyCreatePages() {
  const selectType = ["미정", "면접", "자격증", "외국어"];
  const selectPeople = [3, 4, 5, 6];
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

  // 이미지 파일 경로
  const [imgFileUrl, setImgFileUrl] = useState<any>(null);
  // 이미지 변환할 파일
  const [imgFile, setImgFile] = useState<any>();
  const imgRef = useRef<HTMLInputElement>(null);
  const [isActive, setIsActivate] = useState<boolean>(false);

  // 이미지 업로드 input의 onChange
  const saveImgFile = (el: any) => {
    if (imgRef.current?.files !== undefined && imgRef.current?.files !== null) {
      const file = imgRef.current?.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (reader.result) {
          setImgFile(reader.result);
        }
      };
      setImgFileUrl(el.target.files[0]);
      setIsActivate(true);
    }
  };

  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  // 시작 시간
  const [startTime, setStartTime] = useState<Date | null>(null);
  // 종료 시간
  const [endTime, setEndTime] = useState<Date | null>(null);

  let time = "";
  if (startTime !== null && endTime !== null) {
    time = startTime?.toString() + " ~ " + endTime?.toString();
  } else if (startTime !== null && endTime === null) {
    time = startTime?.toString() + " ~ 미정";
  } else {
    time = "미정";
  }

  const BASE_URL = `https://i8b205.p.ssafy.io/be-api/`;

  const token = localStorage.getItem("kakao-token");
  // const [list, setList] = useState<studyDetailData[] | null>(null);

  // 스터디 타입 불러오기
  const { data: studyType } = useQuery<StudyType>("studyTypeApi", () =>
    studyTypeApi(),
  );

  // //-------------------------------------------------------------------
  const [study_name, setStudy_name] = useState<string>("");
  const [study_typeId, setStudy_typeId] = useState<number>(0);
  const [study_maxPerson, setStudy_maxPerson] = useState<number>(0);
  // const [study_startDate, setStudy_startDate] = useState<string>("");
  // const [study_endDate, setStudy_endDate] = useState<string>("");
  const [study_description, setStudy_description] = useState<string>("");
  // const [study_time, setStudy_time] = useState<string>("");
  const [study_file, setStudy_file] = useState<string>("");

  const history = useHistory();
  const onCreateStudy = () => {
    // 이름
    if (study_name === "") {
      Swal.fire({
        icon: "error",
        title: "이런...",
        text: "이름을 입력해주세요!!",
      });
      return;
    }
    // 스터디 유형
    if (study_typeId === 0) {
      Swal.fire({
        icon: "error",
        title: "이런...",
        text: "유형을 선택해주세요!!",
      });
      return;
    }

    // 최대 인원
    if (study_maxPerson === 0) {
      Swal.fire({
        icon: "error",
        title: "이런...",
        text: "인원을 선택해주세요!!",
      });
      return;
    }

    // 기간
    if (startDate === null) {
      Swal.fire({
        icon: "error",
        title: "이런...",
        text: "시작 날짜를 선택해주세요!!",
      });
      return;
    }
    if (endDate === null) {
      Swal.fire({
        icon: "error",
        title: "이런...",
        text: "마감 날짜를 선택해주세요!!",
      });
      return;
    }

    const formData = new FormData();

    const data = {
      name: study_name,
      typeId: study_typeId,
      maxPerson: study_maxPerson,
      startDate: changeFormat(startDate, "yyyy-MM-DD"),
      endDate: changeFormat(endDate, "yyyy-MM-DD"),
      description: study_description,
      time: time,
    };

    formData.append("data", JSON.stringify(data));
    formData.append("file", imgFileUrl);

    CreateStudyApi(formData);

    // 나중에 내 스터디 조회로 이동 하는 걸로 수정
    history.push("/search");
  };

  const Change_name = (e: any) => {
    e.preventDefault();
    setStudy_name(e.target.value);
  };
  const Change_typeId = (e: any) => {
    e.preventDefault();
    setStudy_typeId(e.target.value);
  };
  const Change_maxPerson = (e: any) => {
    e.preventDefault();
    setStudy_maxPerson(e.target.value);
  };
  const Change_startTime = (e: any) => {
    e.preventDefault();
    setStartTime(e.target.value);
  };
  const Change_endTime = (e: any) => {
    e.preventDefault();
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
          <SelectWrapper>
            <SelectSmallTotal>
              <SelectName>
                스터디 유형<RedStar>*</RedStar>
              </SelectName>
              <SelectBox onChange={Change_typeId}>
                <option value="0">-- 유형 --</option>
                {studyType?.result.types?.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                ))}
              </SelectBox>
            </SelectSmallTotal>
            <SelectSmallTotal>
              <SelectName>
                모집 인원<RedStar>*</RedStar>
              </SelectName>
              <SelectBox onChange={Change_maxPerson}>
                <option value="0">-- 인원 --</option>
                {selectPeople.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </SelectBox>
            </SelectSmallTotal>
          </SelectWrapper>
          <SelectSmallTotal>
            <SelectName>
              기간<RedStar>*</RedStar>
            </SelectName>
            {/* <SelectBox></SelectBox> */}
            <DateTime>
              <CalendarBox>
                <Calendar
                  dateFormat="yyyy년 MM월 dd일"
                  selected={startDate}
                  onChange={(date: Date) => setStartDate(date)}
                  selectsStart
                  minDate={new Date()}
                  startDate={startDate}
                  endDate={endDate}
                />
              </CalendarBox>
              <p>~</p>
              <CalendarBox>
                <Calendar
                  dateFormat="yyyy년 MM월 dd일"
                  selected={endDate}
                  onChange={(date: Date) => setEndDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                />
              </CalendarBox>
            </DateTime>
          </SelectSmallTotal>
          <SelectSmallTotal>
            <SelectName>스터디 시간</SelectName>
            <DateTime>
              <TimeSelectWrapper>
                <SelectBox onChange={Change_startTime}>
                  {selectTime.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </SelectBox>
              </TimeSelectWrapper>
              <p>~</p>
              <TimeSelectWrapper>
                <SelectBox onChange={Change_endTime}>
                  {selectTime.map((item, index) => (
                    <option value={index} key={item}>
                      {item}
                    </option>
                  ))}
                </SelectBox>
              </TimeSelectWrapper>
            </DateTime>
          </SelectSmallTotal>
          <SelectSmallTotal>
            <SelectName>대표 이미지</SelectName>
            <Forms>
              <label className="signup-profileImg-label" htmlFor="profileImg">
                <ImgBox>
                  {isActive && typeof imgFile == "string" ? (
                    <img src={imgFile} alt="" />
                  ) : (
                    <Icons.Camera width="100%" height="100%" />
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
            </Forms>
          </SelectSmallTotal>
          <SelectSmallTotal>
            <SelectName>스터디 설명</SelectName>
            <Introudce
              value={study_description}
              onChange={Change_description}
            />
          </SelectSmallTotal>
          <BtnBox>
            <CreateBtn onClick={onCreateStudy}>스터디 생성</CreateBtn>
            <CancelBtn>
              <Link to="/search">취소</Link>
            </CancelBtn>
          </BtnBox>
        </SelectBigTotal>
      </TotalBox>
    </div>
  );
}

export default StudyCreatePages;
// export default StudyCreatePages;
export function changeFormat(date: Date, format: string) {
  //moment 변환을 함수로 미리 빼 두어서 사용.
  if (moment(date).isValid()) {
    return moment(date).format(format);
  } else {
    return null;
  }
}
