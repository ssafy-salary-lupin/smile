import styled from "styled-components";
import ModalNone from "components/common/ModalNone";
import { Link } from "react-router-dom";
import { UserDropApi } from "../../apis/StudyManageMemberApi";

const Wrapper = styled.div``;

// 모달 안의 내용을 감싸는 요소
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 2.222vw 0;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  span {
    font-size: 1.111vw;
    font-weight: 500;
    color: #061c3d;
  }
`;
// 완료 버튼
const Btn = styled.button.attrs({})`
  margin: 0 2.222vw;
  width: 5.556vw;
  height: 3.333vw;
  border-radius: 0.347vw;
  border: none;
  background-color: ${(props) => props.color};
  font-size: 24.005px;
  color: white;
  cursor: pointer;
  span {
    /* font-size: 1.667vw; */
  }
`;

// 완료 버튼이 있는 요소
const Footer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 8.333vw;
`;
function ModalManageDrop(props: any) {
  const closeModal = () => {
    props.setModalOpen(false);
  };

  return (
    <Wrapper>
      <ModalNone setModalOpen={props.setModalOpen}>
        <Container>
          {/* <Warning width="5.556vw" height="5.556vw" /> */}
          <Title>
            <span>스터디원을 강퇴하시겠습니까?</span>
          </Title>
          <Footer>
            <Link
              to={{
                pathname: `/manage/manageMember`,
              }}
            >
              <Btn
                color="#F5C82E"
                onClick={() => {
                  UserDropApi();
                }}
              >
                <span>확인</span>
              </Btn>
            </Link>
            <Btn color="#314E8D" onClick={closeModal}>
              <span>취소</span>
            </Btn>
          </Footer>
        </Container>
      </ModalNone>
    </Wrapper>
  );
}

export default ModalManageDrop;
