<<<<<<< HEAD
import { SetStateAction } from "react";
import styled from "styled-components";
import ModalNone from "components/common/ModalNone";
import { Close as CloseIcon } from "components/common/Icons";
=======
import { SetStateAction, useState } from "react";
import styled from "styled-components";
import ModalNone from "components/common/ModalNone";
import { Close as CloseIcon } from "components/common/Icons";
import ReactQuill from "react-quill";
import { StudyInfoSelectApi, StudySelectApi } from "apis/StudyManageMainApi";
import { useQuery } from "react-query";
import { DataInfo } from "./StudyManageMain";
import { useRecoilValue } from "recoil";
import { studyIdRecoil } from "atoms/StudyManage";
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3

// 모달의 크기 설정
const Wrapper = styled.div`
  .modalBox {
<<<<<<< HEAD
    width: 56.111vw;
    height: 47.222vw;
=======
    width: 41.667vw;
    height: 27.778vw;
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
  }
`;

// 모달 안의 내용을 감싸는 요소
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

// 제목과 X아이콘을 포함하는 헤더
const Header = styled.div`
  display: flex;
<<<<<<< HEAD
  justify-content: space-between;
  align-items: center;
  height: 6.458vw;
  background-color: rgba(49, 78, 141, 0.2);
=======
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  height: 15%;
  background-color: #efefef;
  border-radius: 0.556vw 0.556vw 0 0;
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
`;

// 제목
const Title = styled.div`
  display: flex;
<<<<<<< HEAD
  justify-content: center;
=======
  justify-content: flex-start;
  padding-left: 1.667vw;
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
  align-items: center;
  width: 100%;
  height: 100%;
  span {
<<<<<<< HEAD
    font-size: 2.222vw;
=======
    font-size: 1.389vw;
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
    font-weight: 600;
  }
`;

// 모달을 닫을 수 있는 아이콘
const Close = styled(CloseIcon)`
  cursor: pointer;
  position: absolute;
<<<<<<< HEAD
  right: 3.333vw;
=======
  right: 1.111vw;
  width: 1.667vw;
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
`;

// 내용(텍스트 에디터)가 있는 요소
const Section = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
<<<<<<< HEAD
  /* height: 100%; */
  margin: 1.667vw 0px;
`;

// 텍스트 에디터로 나중에 대체
const TextEditer = styled.textarea`
  width: 53.611vw;
  height: 29.236vw;
  border: 1px solid rgba(0, 0, 0, 0.5);
  font-size: 1.667vw;
  :focus {
    background-color: ${(props) => props.theme.subColor};
    box-shadow: 0px 0px 2vw #666b70;
  }
`;

// 밑줄
const Hr = styled.div`
  height: 0px;
  border: 0.5px solid rgba(0, 0, 0, 0.5);
`;

// 완료 버튼이 있는 요소
const Footer = styled.div`
  display: flex;
  height: 8.333vw;
`;

// 완료 버튼
const SumitBtn = styled.button.attrs({})`
  position: absolute;
  bottom: 2.222vw;
  right: 2.222vw;
  width: 11.25vw;
  height: 4.167vw;
  border-radius: 0.347vw;
  border: none;
  background-color: ${(props) => props.theme.mainColor};
  font-size: 1.667vw;
  cursor: pointer;
  span {
    /* font-size: 1.667vw; */
  }
=======
  /* width: 53.611vw; */
  /* height: 29.236vw; */
  height: 70%;
  /* margin: 1.667vw 0px; */
  padding: 1.111vw;
  background-color: #efefef;

  .quill {
    width: 100%;
    height: 100%;
    text-align: center;
    background-color: ${(props) => props.theme.whiteColor};
    border: 1px dotted ${(props) => props.theme.blackColorOpacity};
    border-radius: 1.111vw;
  }

  .ql-container.ql-snow {
    border: 1px solid transparent;
    height: 100%;
    /* background-color: ${(props) => props.theme.subColor}; */
    /* box-shadow: 0px 0px 2vw #666b70; */
  }
`;

const ModalBtnBox = styled.div`
  width: 100%;
  height: 15%;
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
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
`;

interface IPropsType {
  setModalOpen: React.Dispatch<SetStateAction<boolean>>;
<<<<<<< HEAD
}
function StudyRuleModal(props: IPropsType) {
  const closeModal = () => {
    props.setModalOpen(false);
  };
=======
  createRule: Function;
}

interface IDataInfo {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    id: number;
    name: string; //스터디 이름
    startDate: string; //스터디 시작 일자
    endDate: string; //스터디 종료 일자
    time: string; //스터디 시간
    imagePath: string; //스터디 대표 이미지
    currrentPerson: number; //스터디 현재 가입 인원
    maxPerson: number; //스터디 최대 가입 인원
    viewCount: number; //스터디 조회수
    description: string; //스터디 설명
    type: {
      id: number; //스터디 유형 식별자
      name: string; //스터디 유형 이름
    };
    leader: {
      id: number;
      imagePath: string;
      nickname: string;
    };
    comments: [
      {
        user: {
          id: number; //댓글 작성자 식별자
          imagePath: string; //프로필
          nickname: string; //댓글 작성자 닉네임
        };
        content: string; //댓글 내용
        replies: [
          //답글리스트
          {
            user: {
              id: number; //대댓글 작성자 식별자
              imagePath: string; //프로필
              nickname: string; //대댓글 작성자 닉네임
            };
            content: string; //대댓글 내용
          },
        ];
      },
    ];
  };
}

function StudyRuleModal(props: IPropsType) {
  const studyId = useRecoilValue(studyIdRecoil);
  console.log("규칙 모달창에서 studyId : ", studyId);

  const closeModal = () => {
    props.setModalOpen(false);
  };
  const { data: studyInfo } = useQuery<IDataInfo>("studySelectApi", () =>
    StudySelectApi(studyId),
  );
  const { data: studyMainInfo } = useQuery<DataInfo>("studyInfoSelectApi", () =>
    StudyInfoSelectApi(studyId),
  );
  const [rule, setRule] = useState(studyMainInfo?.result.rule);

  const registRule = () => {
    const data = {
      name: studyInfo?.result.name, //스터디 이름
      endDate:
        studyInfo?.result.endDate.split("-")[0] +
        "-" +
        studyInfo?.result.endDate.split("-")[1] +
        "-" +
        studyInfo?.result.endDate.split("-")[2], // 스터디 종료날짜
      time: studyInfo?.result.time, // 스터디 하는 시간.
      maxPerson: studyInfo?.result.maxPerson, // 스터디 최대인원
      typeId: studyInfo?.result.type.id, // 면접 스터디
      description: studyInfo?.result.description, // 스터디 설명
      rule: rule, //스터디 규칙
    };

    const file = "";

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("files", file);

    props.createRule(formData);
    closeModal();
  };

  const modules = {
    toolbar: false,
  };

>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
  return (
    <Wrapper>
      <ModalNone setModalOpen={props.setModalOpen}>
        <Container>
          <Header>
            <Title>
              <span>New Rule</span>
            </Title>
            <Close onClick={closeModal} width="2.778vw" height="2.778vw" />
          </Header>
          <Section>
<<<<<<< HEAD
            <TextEditer />
          </Section>
          <Hr />
          <Footer>
            <SumitBtn>
              <span>작성 완료</span>
            </SumitBtn>
          </Footer>
=======
            <ReactQuill
              theme="snow"
              onChange={(el: any) => {
                setRule(el);
              }}
              modules={modules}
              value={rule}
            />
          </Section>
          <ModalBtnBox>
            <ModalBtn onClick={registRule}>규칙 등록하기 →</ModalBtn>
          </ModalBtnBox>
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
        </Container>
      </ModalNone>
    </Wrapper>
  );
}

export default StudyRuleModal;
