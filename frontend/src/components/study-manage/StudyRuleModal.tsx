import { SetStateAction, useState } from "react";
import styled from "styled-components";
import ModalNone from "components/common/ModalNone";
import { Close as CloseIcon } from "components/common/Icons";

const Wrapper = styled.div`
  .modalBox {
    width: 56.111vw;
    height: 47.222vw;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6.458vw;
  background-color: rgba(49, 78, 141, 0.2);
`;
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
const Close = styled(CloseIcon)`
  cursor: pointer;
  position: absolute;
  right: 3.333vw;
`;
const Section = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  /* height: 100%; */
  margin: 1.667vw 0px;
`;
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
const Hr = styled.div`
  height: 0px;
  border: 0.5px solid rgba(0, 0, 0, 0.5);
`;
const Footer = styled.div`
  display: flex;
  height: 8.333vw;
`;
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
`;

interface IPropsType {
  setModalOpen: React.Dispatch<SetStateAction<boolean>>;
}
function StudyRuleModal(props: IPropsType) {
  const closeModal = () => {
    props.setModalOpen(false);
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
            <TextEditer />
          </Section>
          <Hr />
          <Footer>
            <SumitBtn>
              <span>작성 완료</span>
            </SumitBtn>
          </Footer>
        </Container>
      </ModalNone>
    </Wrapper>
  );
}

export default StudyRuleModal;
