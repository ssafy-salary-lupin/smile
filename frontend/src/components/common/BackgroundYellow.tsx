import styled from "styled-components";

interface bgProps {
  bgHeight: number;
}

export const BackgroundYellow = styled.div<bgProps>`
  position: absolute;
  z-index: -1;
  background-image: linear-gradient(
    to bottom,
    ${(props) => props.theme.mainColor},
    white
  );
  height: ${(props) => String(props.bgHeight) + "vw"};
  @media screen and (min-width: 1440px) {
    height: ${(props) => String(props.bgHeight / 0.069) + "px"};
  }
  width: 100vw;
  top: 0;
`;
