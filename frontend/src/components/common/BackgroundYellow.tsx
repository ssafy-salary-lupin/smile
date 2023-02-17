import styled from "styled-components";

export const BackgroundYellow = styled.div`
  position: absolute;
  z-index: -1;
  background-image: linear-gradient(
    to bottom,
    ${(props) => props.theme.mainColor},
    white
  );
  height: 40vw;
  width: 100vw;
  top: 0;
`;
