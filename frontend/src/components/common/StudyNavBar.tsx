// import { Link } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";
import "../../assets/css/index.css";

const StudyNav = styled.div`
  align-items: center;
  /* height: 3.192vw; */
  /* margin: 3.192vw; */
`;

const BlankSpace = styled.div`
  height: 7.383vw;
`;

const Items = styled.li`
  display: flex;
  color: gray;
  font-size: 0.694vw;
  justify-content: center;
  padding: 0vw 1.12vw;
`;

const ItemText = styled.ul`
  margin: 0 2.24vw; // 0 4rem;
  padding: 1.4vw 1.12vw;
  /* 텍스트 세로 중앙 정렬 위해 display, align-items 속성 추가 */
  font-size: 1.12vw;
  display: flex;
  align-items: center;

  &:hover,
  active,
  focus {
    cursor: pointer;
    font-weight: bold;
    color: black;
    /* margin: 0 1.9vw; */
    /* font-size: 1.4vw; */
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
