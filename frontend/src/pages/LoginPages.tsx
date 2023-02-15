import BlankSpace from "components/common/BlankSpace";
import styled from "styled-components";
import { ReactComponent as Logo } from "assets/img/LogoYellow.svg";
const Container = styled.div`
  height: 100vh;
  width: 100vw;
`;

const LogoContainer = styled.div`
  position: absolute;
  left: 40.6vw;
  top: 13vh;
`;

const LoginFrame = styled.iframe`
  width: 100vw;
  height: 100vh;
  border: none;
`;

export default function LoginPages() {
  return (
    <Container>
      <BlankSpace />
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <LoginFrame
        title="login"
        src="https://i8b205.p.ssafy.io/be-api/oauth2/authorization/kakao"
      />
    </Container>
  );
}
