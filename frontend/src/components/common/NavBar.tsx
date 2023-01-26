// import { Link } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";
import logoImg from "../../assets/img/smile.png";
import "../../assets/css/index.css";
import { motion, useAnimation, useScroll } from "framer-motion";

const Nav = styled(motion.nav)`
  position: fixed;
  width: 100%;

  display: flex;
  justify-content: space-between;
  padding: 0.784vw; //0.7rem
  align-items: center;
`;

const NavHeader = styled.div`
  margin-left: 3.36vw; //3rem
`;

const LinksContainer = styled.div`
  overflow: hidden;
`;

const Items = styled.li`
  display: flex;
  margin-right: 2.24vw; // 2rem;
`;

const Item = styled.ul`
  list-style-type: none;
  margin: 0 2.24vw; // 0 2rem;
  /* 텍스트 세로 중앙 정렬 위해 display, align-items 속성 추가 */
  display: flex;
  align-items: center;
  font-size: 1.12vw;

  &:hover,
  active,
  focus {
    cursor: pointer;
  }
`;

const NabBtn = styled.button`
  cursor: pointer;
  border-radius: 4px;
  padding: 0.56vw 1.12vw; // 0.5rem 1rem;
  margin: 0;
  background-color: ${(props) => props.theme.subColor2};
  color: white;
  border: 0;
  text-decoration: none;
  font-size: 1.12vw;

  &:hover,
  active,
  focus {
    background: ${(props) => props.theme.subColorHover};
  }
`;

const Img = styled.img`
  height: 2.1vw;
`;

// Link가 포함된 컴포넌트를 Router 안에 들어가 있어야 사용이 가능 => 일단 보류(페이지 만들어진 뒤에 추가)

const navVariants = {
  top: {
    backgroundColor: `rgba(255, 255, 255, 0)`,
    boxShadow: `0px 5px 5px rgba(0, 0, 0, 0)`,
  },
  scroll: {
    backgroundColor: `rgba(255, 255, 255, 1)`,
    boxShadow: `0px 5px 5px rgba(0, 0, 0, 0.1)`,
  },
  fix: {
    backgroundColor: `rgba(255, 255, 255, 1)`,
    boxShadow: `0px 5px 5px rgba(0, 0, 0, 0.1)`,
  },
};

function NavBar() {
  const { scrollY } = useScroll();
  const navAnimation = useAnimation();
  const curPath = window.location.pathname;
  useEffect(() => {
    if (curPath === "/") {
      scrollY.onChange(() => {
        if (scrollY.get() > 80) {
          navAnimation.start("scroll");
        } else {
          navAnimation.start("top");
        }
      });
    } else {
      navAnimation.start("fix");
    }
  }, [scrollY, navAnimation, curPath]);

  return (
    <Nav variants={navVariants} animate={navAnimation} initial={"top"}>
      <NavHeader>
        <Img src={logoImg} />
      </NavHeader>
      <LinksContainer>
        <Items>
          <Item>{/* <Link to="">스터디 조회</Link> */} 스터디 조회</Item>
          <Item>내 스터디</Item>
          <Item>내 정보</Item>
          <Item>
            <NabBtn>로그아웃</NabBtn>
          </Item>
        </Items>
      </LinksContainer>
    </Nav>
  );
}
export default NavBar;
