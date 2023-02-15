// import { Link } from "react-router-dom";
import { StudyUserApi } from "apis/StudyManageMemberApi";
import { studyIdRecoil } from "atoms/StudyManage";
import { UserIdState } from "atoms/UserInfoAtom";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import "../../assets/css/index.css";

const StudyNav = styled.div`
  align-items: center;
  /* height: 3.192vw; */
  /* margin: 3.192vw; */
  a,
  a:link,
  a:visited,
  a:active {
    text-decoration: none;
    color: ${(props) => props.theme.blackColorOpacity4};
  }

  a:hover {
    color: ${(props) => props.theme.blackColor};
  }
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
  padding: 1.4vw 0;
  /* 텍스트 세로 중앙 정렬 위해 display, align-items 속성 추가 */
  font-size: 1.12vw;
  display: flex;
  align-items: center;
  text-decoration: none;

  &:hover,
  &:active,
  &:focus {
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

interface Data {
  code: number;
  isSuccess: boolean;
  message: string;
  result: [
    {
      id: number; //사용자 식별자
      nickname: string; //사용자 닉네임
      email: string; //사용자 이메일
      imgPath: string; //사용자 프로필 사진 url
      leader: boolean; //스터디장 유무
    },
  ];
}

function StudyNavBar() {
  const studyId = useRecoilValue(studyIdRecoil);

  const { data: userStudy } = useQuery<Data>("userStudy", () =>
    StudyUserApi(studyId),
  );

  return (
    <StudyNav>
      <BlankSpace />
      <Items>
        <ItemText>
          <Link to={`/manage/${studyId}`}>홈</Link>
        </ItemText>
        <Itemline>|</Itemline>
        <ItemText>
          <Link to={`/manage/board/${studyId}`}>게시판</Link>
        </ItemText>
        <Itemline>|</Itemline>
        <ItemText>
          <Link to={`/manage/calendar/${studyId}`}>일정관리</Link>
        </ItemText>
        <Itemline>|</Itemline>
        <ItemText>
          <Link to={`/manage/meetingRecord/${studyId}`}>화상 회의</Link>
        </ItemText>
        <Itemline>|</Itemline>
        <ItemText>
          {userStudy?.result.leader ? (
            <Link to={`/manage/manageMember/${studyId}`}>스터디 관리</Link>
          ) : null}
        </ItemText>
      </Items>
    </StudyNav>
  );
}
export default StudyNavBar;
