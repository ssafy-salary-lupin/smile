<<<<<<< HEAD
import styled from "styled-components";
import logoImg from "../../assets/img/smile_white.png";
import "../../assets/css/index.css";

const FooterContainer = styled.footer`
  background-color: ${(props) => props.theme.blackColor};
  color: ${(props) => props.theme.whiteColor};
  padding: 4.861vw 3.75vw;
  margin-top: 13.889vw;
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
    list-style: none;
  }
  li {
    margin-right: 3rem;
    font-size: 0.98vw;
    letter-spacing: -0.24px;
    list-style: none;
  }
`;

const FooterCon2 = styled.div`
  margin-top: 3rem;
  address {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  a {
    color: ${(props) => props.theme.whiteColor};
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
  color: ${(props) => props.theme.whiteColor};
  cursor: pointer;
  font-size: 1.12vw;
`;

const Img = styled.img`
  height: 2.133vw;
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
=======
import styled from "styled-components";
import logoImg from "../../assets/img/smile_white.png";
import "../../assets/css/index.css";

const FooterContainer = styled.footer`
  background-color: ${(props) => props.theme.blackColor};
  color: ${(props) => props.theme.whiteColor};
  padding: 4.861vw 3.75vw;
  margin-top: 13.889vw;
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
    list-style: none;
  }
  li {
    margin-right: 3rem;
    font-size: 0.98vw;
    letter-spacing: -0.24px;
    list-style: none;
  }
`;

const FooterCon2 = styled.div`
  margin-top: 3rem;
  address {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  a {
    color: ${(props) => props.theme.whiteColor};
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
  color: ${(props) => props.theme.whiteColor};
  cursor: pointer;
  font-size: 1.12vw;
`;

const Img = styled.img`
  height: 2.133vw;
`;

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <FooterContainer className="Footer">
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
            <TopButton onClick={scrollToTop}>TOP</TopButton>
          </Copy>
        </FooterCon2>
      </FooterWrap>
    </FooterContainer>
  );
}
export default Footer;

>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
