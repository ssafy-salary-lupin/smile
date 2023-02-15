import { studyIdRecoil } from "atoms/StudyManage";
import { SetStateAction, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ReactComponent as Close } from "../../assets/icon/Close.svg";
import { ReactComponent as Meeting } from "../../assets/icon/Meeting.svg";

interface PropsType {
  setModalOpen: React.Dispatch<SetStateAction<boolean>>;
  type: string;
  title: string;
  start: string;
  time: string;
  host: string;
}

const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
  position: fixed;
  width: 27.778vw;
  height: 19.444vw;
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
  height: 15%;
  width: 100%;
  /* background-color: ${(props) => props.theme.pointColorOpacity}; */
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
  height: 65%;
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 2vw 1vw;
  border-bottom: 1px solid ${(props) => props.theme.blackColorOpacity};
  /* align-items: center; */
`;

const ModalImg = styled.div`
  padding: 1vw;
  width: 30%;
`;

const ModalContent = styled.div`
  width: 70%;
  /* padding: 0 3vw; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 2vw;
`;

const Title = styled.input`
  border: none;
  color: ${(props) => props.theme.pointColor};
  font-size: 1.5vw;
  font-weight: bold;
  margin-bottom: 1vw;
  background-color: ${(props) => props.theme.whiteColor};
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 0.5vw;
`;

const Label = styled.div`
  border-radius: 1vw;
  border: 0.05vw solid ${(props) => props.theme.pointColorOpacity};
  color: ${(props) => props.theme.pointColor};
  font-size: 1vw;
  padding: 0.5vw;
`;

const Type = styled.input`
  width: 50%;
  border: none;
  color: ${(props) => props.theme.blackColor};
  font-size: 1vw;
  margin-left: 0.5vw;
  background-color: ${(props) => props.theme.whiteColor};
`;

const Date = styled(Type)``;

const Host = styled(Type)``;

const ModalBtnBox = styled.div`
  width: 100%;
  height: 20%;
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
function ModalCalendarMeetingView(props: PropsType) {
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

  const studyId = useRecoilValue(studyIdRecoil);

  return (
    <Backdrop>
      <ModalContainer ref={modalRef}>
        <ModalHead>
          <Space>
            <p>Study Meeting</p>
          </Space>
          <CloseBtn onClick={closeModal}>
            <Close width="100%" height="100%" fill="#0000007b" />
          </CloseBtn>
        </ModalHead>
        <ModalConWrapper>
          <ModalImg>
            <Meeting width="100%" height="100%" />
          </ModalImg>
          <ModalContent>
            <Title placeholder="회의 제목" disabled value={props.title} />
            <ContentWrap>
              <Label>회의 유형</Label>
              <Type placeholder="회의 유형" disabled value={props.type} />
            </ContentWrap>
            <ContentWrap>
              <Label>회의 주최자</Label>
              <Host placeholder="회의 주최자" disabled value={props.host} />
            </ContentWrap>
            <ContentWrap>
              <Label>회의 날짜</Label>
              <Date placeholder="회의 날짜" disabled value={props.time} />
            </ContentWrap>
          </ModalContent>
        </ModalConWrapper>
        <ModalBtnBox>
          <ModalBtn>
            <Link to={`/meeting/${studyId}`}>회의 참여하기 →</Link>
          </ModalBtn>
        </ModalBtnBox>
      </ModalContainer>
    </Backdrop>
  );
}
export default ModalCalendarMeetingView;
