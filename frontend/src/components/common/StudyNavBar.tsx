// import { Link } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";
import "../../assets/css/index.css";

const StudyNav = styled.div`
  align-items: center;
`;

const BlankSpace = styled.div`
  height: 7.384vw;
`;

const Items = styled.li`
  display: flex;
  color: gray;
  font-size: 0.694vw;
  justify-content: center;
`;

const ItemText = styled.ul`
  margin: 0 2.24vw; // 0 4rem;
  padding: 1.4vw 0.069vw;
  /* 텍스트 세로 중앙 정렬 위해 display, align-items 속성 추가 */
  font-size: 1.12vw;
  display: flex;
  align-items: center;

  &:hover,
  active,
  focus {
    cursor: pointer;
    font-weight: bold;
  }
`;
const Itemline = styled.ul`
  margin: 0 2.24vw; // 0 4rem;
  padding: 1.4vw 0.069vw;
  /* 텍스트 세로 중앙 정렬 위해 display, align-items 속성 추가 */
  font-size: 1.12vw;
  display: flex;
  align-items: center;
`;

const NabBtn = styled.button`
  cursor: pointer;
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

function StudyNavBar() {
  return (
    <StudyNav>
      <BlankSpace />
      <Items>
        <ItemText>홈</ItemText>
        <Itemline>|</Itemline>
        <ItemText>게시판</ItemText>
        <Itemline>|</Itemline>
        <ItemText>일정관리</ItemText>
        <Itemline>|</Itemline>
        <ItemText>화상 회의</ItemText>
        <Itemline>|</Itemline>
        <ItemText>스터디 관리</ItemText>
      </Items>
    </StudyNav>
  );
}
export default StudyNavBar;
