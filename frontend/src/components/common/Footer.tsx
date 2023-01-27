import styled from "styled-components";
import logoImg from "../../assets/img/smile.png";
import "../../assets/css/index.css";

const FooterContainer = styled.footer`
  background-color: ${(props) => props.theme.blackColor};
  color: ${(props) => props.theme.whiteOpacityColor};
  padding: 3rem 2rem;
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  font-size: 1.12vw;
  // position: absolute;
  // bottom: 0;
  // width: 100%;
`;

const FooterWrap = styled.div``;

const FooterCon1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ul {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  li {
    margin-right: 3rem;
    font-size: 0.98vw;
    letter-spacing: -0.24px;
  }
`;

const FooterCon2 = styled.div`
  margin-top: 3rem;
  a {
    color: ${(props) => props.theme.whiteOpacityColor};
  }
  p {
    line-height: 30px;
  }
`;
const Copy = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TopButton = styled.button`
  background-color: ${(props) => props.theme.blackColor};
  border: 0px;
  color: ${(props) => props.theme.whiteOpacityColor};
  cursor: pointer;
  font-size: 1.12vw;
`;

const Img = styled.img`
  height: 30px;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterWrap>
        <FooterCon1>
          <ul>
            <li>회사소개</li>
            <li>이용약관</li>
            <li>개인정보처리방침</li>
          </ul>
          <Img src={logoImg} />
        </FooterCon1>
        <FooterCon2>
          <address>
            <p>
              SSAFY공통프로젝트&emsp;·&emsp;싸월급루팡조&emsp;·&emsp;042-820-7400
            </p>
            <p>대전 유성구 동서대로 98-39</p>
            <p>
              문의 <a href="">ssafy@ssafy.com</a>
            </p>
          </address>
          <Copy>
            <p>COPYRIGHT 2023. SSAFY. ALL RIGHTS RESERVED</p>
            <TopButton>TOP</TopButton>
          </Copy>
        </FooterCon2>
      </FooterWrap>
    </FooterContainer>
  );
}
export default Footer;
