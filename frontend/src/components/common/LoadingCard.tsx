import styled from "styled-components";

const SContainer = styled.div`
  display: grid;
  grid-template-rows: 21.84vw 12.91vw;
  border-radius: 1.12vw;
  width: 29.68vw;
  height: 36.75vw;
  margin-bottom: 2.222vw;
  border: solid 1px #e6e8ec;
  box-shadow: 0px 0px 1.12vw ${(props) => props.theme.subColor};
`;

export default function LoadingCard() {
  return <SContainer></SContainer>;
}
