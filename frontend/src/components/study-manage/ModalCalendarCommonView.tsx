import { SetStateAction, useEffect, useRef } from "react";
import styled from "styled-components";
import { ReactComponent as Close } from "../../assets/icon/Close.svg";
import { ReactComponent as Calendar } from "../../assets/icon/Calendar.svg";
import { ReactComponent as Hashtag } from "../../assets/icon/Hashtag.svg";
import { ReactComponent as LinkLogo } from "../../assets/icon/Link.svg";

interface PropsType {
  setModalOpen: React.Dispatch<SetStateAction<boolean>>;
  title: string;
  start: string;
  end: string;
  // startTime: string;
  // endTime: string;
  desc: string;
  type: string;
  link: string;
}

const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
  position: fixed;
  width: 28.889vw;
  height: 23.333vw;
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
  background-color: ${(props) => props.theme.mainColorOpacity};
  border-radius: 0.556vw 0.556vw 0 0;
  display: flex;
  flex-direction: row;
  padding: 0.556vw;
`;

const Space = styled.div`
  width: 90%;
  height: 100%;
  color: ${(props) => props.theme.mainColorDark};
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
  height: 70%;
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
  color: ${(props) => props.theme.mainColorDark};
  font-size: 1.364vw;
  font-weight: bold;
  margin-bottom: 1vw;
  background-color: ${(props) => props.theme.whiteColor};
`;

const Text = styled.div`
  background-color: ${(props) => props.theme.mainColorOpacity};
  padding: 0.5vw;
  width: 100%;
  /* border: 1px solid ${(props) => props.theme.mainColor}; */
  border-radius: 0.5vw;
  min-height: 1.364vw;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    height: 17%;
    background-color: ${(props) => props.theme.mainColor};
    border-radius: 10px;
  }
  margin-bottom: 0.455vw;
`;

const HashtagBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 1.136vw;
  margin-bottom: 0.455vw;
`;

const HashtagTxt = styled.div`
  width: 90%;
  color: ${(props) => props.theme.blackColorOpacity2};
  font-size: 0.909vw;
`;

const Link = styled.a`
  cursor: pointer;
  width: 90%;
  color: ${(props) => props.theme.blackColorOpacity2};
  font-size: 0.909vw;
`;

const ModalBtn = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 0.5vw 0;
`;

const YellowBtn = styled.button`
  cursor: pointer;
  border-radius: 0.25vw;
  padding: 0.5vw 1vw;
  background-color: ${(props) => props.theme.mainColor};
  color: ${(props) => props.theme.blackColor};
  border: 0;
  margin-right: 1vw;
  font-size: 1vw;
`;

function ModalBasic(props: PropsType) {
  // const [modalOpen, setModalOpen] = useState<boolean>(true);
  // ?????? ??????
  const closeModal = () => {
    props.setModalOpen(false);
  };
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // ????????? ????????? ??????
    const handler = (event: any) => {
      // mousedown ???????????? ????????? ????????? ???????????? ?????? ???, ????????? ?????? ??????
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        props.setModalOpen(false);
      }
    };

    // ????????? ????????? ??????
    document.addEventListener("mousedown", handler);
    // document.addEventListener('touchstart', handler); // ????????? ??????

    return () => {
      // ????????? ????????? ??????
      document.removeEventListener("mousedown", handler);
      // document.removeEventListener('touchstart', handler); // ????????? ??????
    };
  });
  return (
    <Backdrop>
      <ModalContainer ref={modalRef}>
        <ModalHead>
          <Space>
            <p>Schedule</p>
          </Space>
          <CloseBtn onClick={closeModal}>
            <Close width="100%" height="100%" fill="#0000007b" />
          </CloseBtn>
        </ModalHead>
        <ModalConWrapper>
          <ModalImg>
            <Calendar width="100%" height="100%" />
          </ModalImg>
          <ModalContent>
            <Title placeholder="?????? ??????" disabled value={props.title} />
            <Text>{props.desc}</Text>
            <HashtagBox>
              <Hashtag width="10%" height="100%" />
              <HashtagTxt>{props.type}</HashtagTxt>
            </HashtagBox>
            {props.link && (
              <HashtagBox>
                <Hashtag width="10%" height="100%" />
                <Link href={props.link}>?????? ????????????</Link>
              </HashtagBox>
            )}
          </ModalContent>
        </ModalConWrapper>
        <ModalBtn>
          <YellowBtn onClick={closeModal}>??????</YellowBtn>
        </ModalBtn>
      </ModalContainer>
    </Backdrop>
  );
}
export default ModalBasic;
