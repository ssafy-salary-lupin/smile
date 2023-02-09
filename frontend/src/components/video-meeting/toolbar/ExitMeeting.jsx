import { SetStateAction } from "react";
import styled from "styled-components";
import ModalNone from "components/common/ModalNone";
import { Close as CloseIcon } from "components/common/Icons";
import { Warning } from "components/common/DuotonIcons";
import { Link } from "react-router-dom";
// 모달의 크기 설정
const Wrapper = styled.div`
  .modalBox {
    width: 35.556vw;
    height: 22.222vw;
  }
`;

// 모달 안의 내용을 감싸는 요소
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 32px 0;
`;

// 제목
const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  span {
    font-size: 32px;
    font-weight: 500;
    color: #061c3d;
  }
`;

// 완료 버튼이 있는 요소
const Footer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 8.333vw;
`;

// 완료 버튼
const Btn = styled.button.attrs({})`
  margin: 0 2.222vw;
  width: 5.556vw;
  height: 3.333vw;
  border-radius: 0.347vw;
  border: none;
  background-color: ${(props) => props.bgColor};
  font-size: 1.667vw;
  cursor: pointer;
  span {
    /* font-size: 1.667vw; */
  }
`;

function ExitMeeting(props) {
  const closeModal = () => {
    props.setModalOpen(false);
  };
  return (
    <Wrapper>
      <ModalNone setModalOpen={props.setModalOpen}>
        <Container>
          <Warning width="5.556vw" height="5.556vw" />

          <Title>
            <span>화상회의를 종료하시겠습니까?</span>
          </Title>
          {/* <Close onClick={closeModal} width="2.778vw" height="2.778vw" /> */}
          <Footer>
            <Link
              to={{
                pathname: `/manage`,
              }}
            >
              <Btn bgColor="#F5C82E" onClick={props.leaveSession}>
                <span>확인</span>
              </Btn>
            </Link>
            <Btn bgColor="#314E8D" onClick={closeModal}>
              <span>취소</span>
            </Btn>
          </Footer>
        </Container>
      </ModalNone>
    </Wrapper>
  );
}

export default ExitMeeting;
