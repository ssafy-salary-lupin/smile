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

interface PropsType {
  children?: React.ReactNode;
}

function MyStudyNotFound(props: PropsType) {
  return <Wrapper>{props.children}</Wrapper>;
}

export default MyStudyNotFound;
