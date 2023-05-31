import { SetStateAction, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Close } from "../../assets/icon/Close.svg";
import { ReactComponent as Check } from "../../assets/icon/Check.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale"; //한국어 설정
import { dateState, studyIdRecoil } from "atoms/StudyManage";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  scheduleSelectApi,
  scheduleUpdateApi,
} from "apis/StudyManageCalendarAPi";
import { useQuery } from "react-query";
import { IScheduleInfo } from "./ModalCalendarCommonView";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

interface PropsType {
  setModalOpen: React.Dispatch<SetStateAction<boolean>>;
  scheduleId: number;
  start: string;
  end: string;
  onUpdate: Function;
}

export interface IRegistData {
  scheduleTypeId: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  url: string;
  color: string;
}

const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
  position: fixed;
  width: 22.222vw;
  height: 36.111vw;
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
  height: 10%;
  width: 100%;
  /* background-color: ${(props) => props.theme.blackColorOpacity3}; */
  border-radius: 0.556vw 0.556vw 0 0;
  display: flex;
  flex-direction: row;
  padding: 0.556vw;
`;

const Space = styled.div`
  width: 90%;
  height: 100%;
  color: ${(props) => props.theme.blackColor};
  font-size: 1.25vw;
  vertical-align: middle;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 1vw;
  font-weight: 600;
`;

const CloseBtn = styled.div`
  width: 10%;
  height: 100%;
  cursor: pointer;
  padding: 0.25vw;
`;

const ModalConWrapper = styled.div`
  height: 83%;
  width: 100%;
  padding: 2vw 3.889vw;
  border-bottom: 1px solid ${(props) => props.theme.blackColorOpacity};
  /* align-items: center; */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5vw 0.5vw;
  border: none;
  outline: none;
  border-bottom: 1px solid ${(props) => props.theme.blackColorOpacity};
  color: ${(props) => props.theme.blackColorOpacity2};
  font-size: 0.833vw;
  margin-bottom: 0.5vw;
`;

const Option = styled.option`
  /* background-color: black; */
  font-size: 0.833vw;
  color: ${(props) => props.theme.blackColorOpacity2};
  li {
    &:hover {
      background-color: black;
    }
  }
`;

const Title = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.blackColorOpacity};
  outline: none;
  padding: 0.5vw 0.5vw;
  margin-bottom: 0.5vw;
  font-size: 0.833vw;
`;

const Link = styled(Title)``;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.blackColorOpacity};
  outline: none;
  font-size: 0.833vw;
  line-height: 100%;
  padding: 0.5vw 0.5vw;
  background-color: transparent;
  color: ${(props) => props.theme.blackColorOpacity2};
  margin-bottom: 0.5vw;
`;

const Desc = styled.textarea`
  width: 100%;
  border: 1px solid ${(props) => props.theme.blackColorOpacity};
  outline: none;
  resize: none;
  height: 9.444vw;
  margin: 0.694vw 0;
  border-radius: 0.278vw;
  padding: 0.556vw;
`;

const ColorBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

const Red = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 2vw;
  height: 2vw;
  border-radius: 50%;
  background-color: #ffa8a8;
  margin: 0 0.5vw;
  &:hover {
    background-color: #dc9393;
  }
`;

const Yellow = styled(Red)`
  background-color: #ffff8c;
  &:hover {
    background-color: #dada79;
  }
`;

const Green = styled(Red)`
  background-color: #99ff99;
  &:hover {
    background-color: #81d681;
  }
`;

const Blue = styled(Red)`
  background-color: #a5e2ff;
  &:hover {
    background-color: #8dc0d8;
  }
`;

const Gray = styled(Red)`
  background-color: #c9c9c9;
  &:hover {
    background-color: #a1a0a0;
  }
`;

const ModalBtnBox = styled.div`
  width: 100%;
  height: 12%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.5vw 0;
  background-color: ${(props) => props.theme.pointColor};
  border-radius: 0 0 0.556vw 0.556vw;
`;

const ModalBtn = styled.button`
  border: none;
  color: white;
  background-color: transparent;
  cursor: pointer;
  font-size: 0.972vw;
`;

function ModalCalendarUpdate(props: PropsType) {
  const studyId = useRecoilValue(studyIdRecoil);

  // 이벤트 클릭 상태값
  const [dateClickState, setDateClickState] = useRecoilState(dateState);

  // 모달 관련 코드 ======================================
  const history = useHistory();
  const closeModal = () => {
    props.setModalOpen(false);
    setDateClickState(false);
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

  const { data: scheduleInfo } = useQuery<IScheduleInfo>(
    "scheduleSelectApi",
    () => scheduleSelectApi(props.scheduleId, studyId),
  );

  const [startDate, setStartDate] = useState<Date>(new Date(props.start));
  const [endDate, setEndDate] = useState<Date>(new Date(props.end));
  const [type, setType] = useState<number | undefined>(
    scheduleInfo?.result.type.id,
  );
  const [title, setTitle] = useState<string | undefined>(
    scheduleInfo?.result.title,
  );
  const [link, setLink] = useState<string | undefined>(
    scheduleInfo?.result.url,
  );
  const [desc, setDesc] = useState<string | undefined>(
    scheduleInfo?.result.description,
  );
  const [color, setColor] = useState<string>("YELLOW");
  // 색깔 선택 상태값
  const [checkYellowState, setCheckYellowState] = useState<boolean>(true);
  const [checkRedState, setCheckRedState] = useState<boolean>(false);
  const [checkBlueState, setCheckBlueState] = useState<boolean>(false);
  const [checkGrayState, setCheckGrayState] = useState<boolean>(false);
  const [checkGreenState, setCheckGreenState] = useState<boolean>(false);

  // data set ===============================
  const handleType = (e: any) => {
    setType(Number(e.target.value));
  };

  const handleTitle = (e: any) => {
    setTitle(e.target.value);
  };

  const handleLink = (e: any) => {
    setLink(e.target.value);
  };

  const handleDesc = (e: any) => {
    setDesc(e.target.value);
  };

  const handleColor = (e: string) => {
    setColor(e);
  };
  // =========================================

  const RegistSchedule = () => {
    // form 빈칸 체크
    if (type === undefined || type < 1) {
      // alert(" 유형을 선택 하세요. ");
      Swal.fire({
        icon: "error",
        title: "이런...",
        text: "유형을 선택해주세요!!",
      });
      return;
    }
    if (title === undefined || title === "") {
      // alert(" 제목을 입력 하세요. ");
      Swal.fire({
        icon: "error",
        title: "이런...",
        text: "제목을 입력해주세요!!",
      });
      return;
    }
    if (desc === undefined || desc === "") {
      // alert(" 내용을 입력 하세요. ");
      Swal.fire({
        icon: "error",
        title: "이런...",
        text: "내용을 입력해주세요!!",
      });
      return;
    }

    const data = {
      startTime:
        startDate.getFullYear().toString() +
        "-" +
        ("0" + (startDate.getMonth() + 1)).slice(-2).toString() +
        "-" +
        ("0" + startDate.getDate()).slice(-2).toString() +
        " " +
        ("0" + startDate.getHours()).slice(-2).toString() +
        ":" +
        ("0" + startDate.getMinutes()).slice(-2).toString(),
      endTime:
        new Date(
          endDate.getFullYear(),
          endDate.getMonth(),
          endDate.getDate() + 1,
          endDate.getHours(),
          endDate.getMinutes(),
        )
          .getFullYear()
          .toString() +
        "-" +
        (
          "0" +
          (new Date(
            endDate.getFullYear(),
            endDate.getMonth(),
            endDate.getDate() + 1,
            endDate.getHours(),
            endDate.getMinutes(),
          ).getMonth() +
            1)
        )
          .slice(-2)
          .toString() +
        "-" +
        (
          "0" +
          new Date(
            endDate.getFullYear(),
            endDate.getMonth(),
            endDate.getDate() + 1,
            endDate.getHours(),
            endDate.getMinutes(),
          ).getDate()
        )
          .slice(-2)
          .toString() +
        " " +
        (
          "0" +
          new Date(
            endDate.getFullYear(),
            endDate.getMonth(),
            endDate.getDate(),
            endDate.getHours(),
            endDate.getMinutes(),
          ).getHours()
        )
          .slice(-2)
          .toString() +
        ":" +
        (
          "0" +
          new Date(
            endDate.getFullYear(),
            endDate.getMonth(),
            endDate.getDate(),
            endDate.getHours(),
            endDate.getMinutes(),
          ).getMinutes()
        )
          .slice(-2)
          .toString(),
      typeId: type,
      name: title,
      url: link,
      description: desc,
      color: color,
    };

    // 일정 등록 메소드 실행
    // if (window.confirm("정말 수정하시곘습니까?")) {
    //   props.onUpdate(data, props.scheduleId);
    //   closeModal();
    // }

    Swal.fire({
      title: "수정을 진행하겠습니까??",
      showCancelButton: true,
      confirmButtonText: "수정",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        props.onUpdate(data, props.scheduleId);
        closeModal();
        Swal.fire("수정완료!", "", "success");
      }
    });
  };

  return (
    <Backdrop>
      <ModalContainer ref={modalRef}>
        <ModalHead>
          <Space>
            <p>Update Schedule</p>
          </Space>
          <CloseBtn onClick={closeModal}>
            <Close width="1.667vw" fill="black" />
          </CloseBtn>
        </ModalHead>
        <ModalConWrapper>
          <Select name="schedule" onChange={handleType}>
            <Option value="0">-- 유형 --</Option>
            {scheduleInfo?.result.type.id === 1 ? (
              <Option value="1" selected>
                면접
              </Option>
            ) : (
              <Option value="1">면접</Option>
            )}
            {scheduleInfo?.result.type.id === 2 ? (
              <Option value="2" selected>
                서류
              </Option>
            ) : (
              <Option value="2">서류</Option>
            )}
            {scheduleInfo?.result.type.id === 3 ? (
              <Option value="3" selected>
                스터디
              </Option>
            ) : (
              <Option value="3">스터디</Option>
            )}
            {scheduleInfo?.result.type.id === 4 ? (
              <Option value="4" selected>
                시험
              </Option>
            ) : (
              <Option value="4">시험</Option>
            )}
          </Select>
          <Title placeholder="회의 제목" onChange={handleTitle} value={title} />
          <Link placeholder="URL" onChange={handleLink} value={link} />
          <StyledDatePicker
            selected={startDate}
            dateFormat="yyyy-MM-dd HH:mm"
            onChange={(date: Date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            locale={ko}
            showTimeSelect
          />
          <StyledDatePicker
            selected={endDate}
            dateFormat="yyyy-MM-dd HH:mm"
            onChange={(date: Date) => {
              setEndDate(date);
            }}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            locale={ko}
            showTimeSelect
          />
          <Desc
            placeholder="회의 설명"
            onChange={handleDesc}
            value={desc}
          ></Desc>
          <ColorBox>
            <Yellow
              onClick={() => {
                handleColor("YELLOW");
                setCheckYellowState(true);
                setCheckRedState(false);
                setCheckBlueState(false);
                setCheckGrayState(false);
                setCheckGreenState(false);
              }}
            >
              {checkYellowState ? (
                <Check width="50%" height="50%" fill="#626262" />
              ) : null}
            </Yellow>
            <Red
              onClick={() => {
                handleColor("RED");
                setCheckYellowState(false);
                setCheckRedState(true);
                setCheckBlueState(false);
                setCheckGrayState(false);
                setCheckGreenState(false);
              }}
            >
              {checkRedState ? (
                <Check width="50%" height="50%" fill="#626262" />
              ) : null}
            </Red>
            <Gray
              onClick={() => {
                handleColor("GRAY");
                setCheckYellowState(false);
                setCheckRedState(false);
                setCheckBlueState(false);
                setCheckGrayState(true);
                setCheckGreenState(false);
              }}
            >
              {checkGrayState ? (
                <Check width="50%" height="50%" fill="#626262" />
              ) : null}
            </Gray>
            <Blue
              onClick={() => {
                handleColor("BLUE");
                setCheckYellowState(false);
                setCheckRedState(false);
                setCheckBlueState(true);
                setCheckGrayState(false);
                setCheckGreenState(false);
              }}
            >
              {checkBlueState ? (
                <Check width="50%" height="50%" fill="#626262" />
              ) : null}
            </Blue>
            <Green
              onClick={() => {
                handleColor("GREEN");
                setCheckYellowState(false);
                setCheckRedState(false);
                setCheckBlueState(false);
                setCheckGrayState(false);
                setCheckGreenState(true);
              }}
            >
              {checkGreenState ? (
                <Check width="50%" height="50%" fill="#626262" />
              ) : null}
            </Green>
          </ColorBox>
        </ModalConWrapper>
        <ModalBtnBox>
          <ModalBtn onClick={RegistSchedule}>일정 수정 →</ModalBtn>
        </ModalBtnBox>
      </ModalContainer>
    </Backdrop>
  );
}
export default ModalCalendarUpdate;
