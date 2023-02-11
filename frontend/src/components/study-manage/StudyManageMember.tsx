import styled from "styled-components";

const Wrapper = styled.div`
  margin: 3.889vw 21.111vw;
  display: flex;
  flex-direction: column;

  a {
    text-decoration: none;
    color: ${(props) => props.theme.blackColor};
  }
`;

//
function StudyManageMember() {
  return <Wrapper>스터디 멤버 관리 페이지</Wrapper>;
}

export default StudyManageMember;
