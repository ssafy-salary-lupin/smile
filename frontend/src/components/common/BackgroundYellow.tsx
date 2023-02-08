import styled from "styled-components";

interface bgProps {
  bgHeight: string;
}

export const BackgroundYellow = styled.div<bgProps>`
  position: absolute;
  z-index: -1;
  background-image: linear-gradient(
    to bottom,
    ${(props) => props.theme.mainColor},
    white
  );
  height: ${(props) => props.bgHeight};
  width: 100vw;
  top: 0;
`;
