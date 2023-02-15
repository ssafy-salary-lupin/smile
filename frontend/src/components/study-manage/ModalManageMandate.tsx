import styled from "styled-components";
import ModalNone from "components/common/ModalNone";
import { MandateApi } from "../../apis/StudyManageMemberApi";
import { Warning } from "components/common/DuotonIcons";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { studyIdRecoil } from "atoms/StudyManage";

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
  font-size: 1.667vw;
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

interface userData {
  result: [
    {
      id: number; //사용자 식별자
      nickname: string; //사용자 닉네임
      email: string; //사용자 이메일
      imagePath: string; //사용자 프로필 사진 url
      isLeader: boolean; //스터디장 유무
    },
  ];
}

type Params = {
  id: string;
};

function ModalManageMandate(props: any) {
  const closeModal = () => {
    console.log("닫힘");
    props.setModalOpen(false);
  };

  const studyId = useRecoilValue(studyIdRecoil);
  // const onMandate = () => {
  //   console.log("on");
  //   const { id } = useParams<Params>();
  //   const { data: studyUsers, refetch } = useQuery<userData>(
  //     "studyUsers",
  //     async () => await MandateApi(id),
  //   );
  // };

  return (
    <Wrapper>
      <ModalNone setModalOpen={props.setModalOpen}>
        <Container>
          <Warning width="5.556vw" height="5.556vw" />
          <Title>
            <span>스터디장을 위임하시겠습니까?</span>
          </Title>
          <Footer>
            {/* <Link
              to={{
                pathname: `/manage/manageMember`,
              }}
            > */}
            <Btn
              color="#F5C82E"
              onClick={() => {
                // MandateApi(studyId, );
                console.log("안녕");
              }}
            >
              <span>확인</span>
            </Btn>
            {/* </Link> */}
            <Btn color="#314E8D" onClick={closeModal}>
              <span>취소</span>
            </Btn>
          </Footer>
        </Container>
      </ModalNone>
    </Wrapper>
  );
}

export default ModalManageMandate;
