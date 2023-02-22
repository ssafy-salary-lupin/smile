import styled from "styled-components";
import ModalNone from "components/common/ModalNone";
import { Link } from "react-router-dom";
import { MandateApi, UserDropApi } from "../../apis/StudyManageMemberApi";
import { useRecoilValue } from "recoil";
import { studyIdRecoil } from "atoms/StudyManage";
import jwt_decode from "jwt-decode";
import { StudyUserApi } from "../../apis/StudyManageMemberApi";
import { useQuery } from "react-query";
import { Warning } from "components/common/Icons";
import { SetStateAction } from "react";

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

interface propsType {
  setModalOpen: React.Dispatch<SetStateAction<boolean>>;
  flag: boolean;
  userId: number; //사용자 식별자
}

function UserModal(props: propsType) {
  const closeModal = () => {
    props.setModalOpen(false);
  };

  const studyId = useRecoilValue(studyIdRecoil);
  return (
    <ModalNone setModalOpen={props.setModalOpen}>
      <Container>
        <Warning width="5.556vw" height="5.556vw" />
        <Title>
          {props.flag ? (
            <span>스터디장을 위임하시겠습니까?</span>
          ) : (
            <span>스터디원을 강퇴하시겠습니까?</span>
          )}
        </Title>
        <Footer>
          <Btn
            color="#F5C82E"
            onClick={() => {
              if (props.flag) {
                MandateApi(studyId, String(props.userId));
              } else {
                UserDropApi(studyId, String(props.userId));
              }
              closeModal();
            }}
          >
            <span>확인</span>
          </Btn>
          <Btn color="#314E8D" onClick={closeModal}>
            <span>취소</span>
          </Btn>
        </Footer>
      </Container>
    </ModalNone>
  );
}

export default UserModal;
