import styled from "styled-components";

const Wrapper = styled.div`
  width: 94.444vw;
  height: 30vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.span`
  font-size: 3.889vw;
  font-weight: 600;
`;

function MyStudyNotFound() {
  return (
    <Wrapper>
      <Text>스터디를 찾을 수 없습니다.</Text>
      <span>(나중에 이미지 혹은 무언가 추가)</span>
    </Wrapper>
  );
}

export default MyStudyNotFound;
