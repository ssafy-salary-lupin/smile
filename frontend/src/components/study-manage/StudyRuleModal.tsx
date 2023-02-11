import { SetStateAction, useState } from "react";
import styled from "styled-components";
import ModalNone from "components/common/ModalNone";
import { Close as CloseIcon } from "components/common/Icons";
import { useRecoilState } from "recoil";
import ReactQuill from "react-quill";

// 모달의 크기 설정
const Wrapper = styled.div`
  .modalBox {
    width: 41.667vw;
    height: 27.778vw;
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
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  height: 15%;
`;

// 제목
const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  span {
    font-size: 2.222vw;
    font-weight: 600;
  }
`;

// 모달을 닫을 수 있는 아이콘
const Close = styled(CloseIcon)`
  cursor: pointer;
  position: absolute;
  right: 3.333vw;
`;

// 내용(텍스트 에디터)가 있는 요소
const Section = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  /* width: 53.611vw; */
  /* height: 29.236vw; */
  height: 70%;
  /* margin: 1.667vw 0px; */
  /* background-color: ${(props) => props.theme.subColor}; */

  .quill {
    width: 100%;
    height: 100%;
    text-align: center;
  }

  .ql-container.ql-snow {
    border: 1px solid transparent;
    height: 100%;
    /* background-color: ${(props) => props.theme.subColor}; */
    /* box-shadow: 0px 0px 2vw #666b70; */
  }

  .ql-container.ql-snow:focus {
  }

  blockquote {
    border-left: 0.556vw solid #ccc;
    margin: 0.694vw;
    padding-left: 0.694vw;
  }
`;

// 텍스트 에디터로 나중에 대체
const TextEditer = styled.textarea`
  width: 53.611vw;
  height: 29.236vw;
  resize: none;
  border: 1px solid rgba(0, 0, 0, 0.5);
  font-size: 1.667vw;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    height: 17%;
    background-color: ${(props) => props.theme.subColor2};
    border-radius: 10px;
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
  flex-direction: row;
  justify-content: center;
  height: 15%;
  background-color: ${(props) => props.theme.pointColor};
  border-radius: 0 0 0.556vw 0.556vw;
`;

// 완료 버튼
const SumitBtn = styled.button.attrs({})`
  position: absolute;
  bottom: 2.222vw;
  right: 2.222vw;
  width: 11.25vw;
  height: 60.005px;
  border-radius: 0.347vw;
  border: none;
  background-color: ${(props) => props.theme.mainColor};
  font-size: 1.111vw;
  cursor: pointer;
  span {
    /* font-size: 24.005px; */
  }
`;

interface IPropsType {
  setModalOpen: React.Dispatch<SetStateAction<boolean>>;
}
function StudyRuleModal(props: IPropsType) {
  const closeModal = () => {
    props.setModalOpen(false);
  };

  const [rule, setRule] = useState("");

  const registRule = () => {};

  const modules = {
    toolbar: false,
  };

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
            {/* <TextEditer /> */}
            <ReactQuill
              theme="snow"
              onChange={(el: any) => {
                setRule(el.target.value);
              }}
              modules={modules}
            />
          </Section>
          <Hr />
          <Footer>
            <SumitBtn onClick={registRule}>
              <span>작성 완료</span>
            </SumitBtn>
          </Footer>
        </Container>
      </ModalNone>
    </Wrapper>
  );
}

export default StudyRuleModal;
