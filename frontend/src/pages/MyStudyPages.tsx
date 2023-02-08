import React from "react";
import { MyStudyApi } from "apis/MyStudyApi";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";
import { BackgroundYellow } from "components/common/BackgroundYellow";
import styled from "styled-components";
import Card from "components/common/Card";
import BlankSpace from "components/common/BlankSpace";
import SearchComponent from "components/common/SearchComponent";
const SearchBar = styled.div``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 2.778vw;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 3.333vw;
  font-weight: 600;
`;

const SubTitle = styled.h2`
  font-size: 2.5vw;
  font-weight: 600;
`;

const Additionalection = styled.div`
  display: flex;
  justify-content: space-around;
`;

const GraphContainer = styled.div``;

const GraphBox = styled.div`
  width: 41.667vw;
  height: 27.778vw;
  background-color: white;
  border-radius: 15px;
`;

const PurposeBox = styled.div`
  width: 50vw;
  height: 27.778vw;
  background-color: #fffbf0;
  border-radius: 15px;
`;

const PurposeContainer = styled.div``;

const CurrentContainer = styled.div``;

const Cards = styled.div<NumberOfCardsProps>`
  display: grid;
  grid-template-columns: repeat(3, 31.48vw);
  /* grid-template-rows: repeat(2, 38.889vw); */
  grid-template-rows: repeat(${(props) => props.NumberOfCards}, 38.889vw);
  margin-top: 2.8vw;
`;

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EndContainer = styled.div``;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
`;

interface StudiesInterface {
  current: [
    {
      studyId: number; // 스터디 식별자
      name: string; // 스터디 이름
      imageUrl: string; // 스터디 대표 이미지 주소
      description: string; // 스터디 설명
      person: number; // 현재 가입 인원
      maxPerson: number; // 최대 가입 인원
      views: number; // 조회수
      lastVisitTime: string; // 마지막 방문 시간
      studyLeader: {
        // 스터디 리더
        userId: number; // 스터디장 유저 식별자
        profileImageUrl: string; // 스터디장 프로필 이미지 주소
        nickname: string; // 스터디장 닉네임
      };
      end: boolean; // 스터디 종료 여부
    },
  ];
  end: [
    {
      studyId: number; // 스터디 식별자
      name: string; // 스터디 이름
      imageUrl: string; // 스터디 대표 이미지 주소
      description: string; // 스터디 설명
      person: number; // 현재 가입 인원
      maxPerson: number; // 최대 가입 인원
      views: number; // 조회수
      lastVisitTime: string; // 마지막 방문 시간
      studyLeader: {
        // 스터디 리더
        userId: number; // 스터디장 유저 식별자
        profileImageUrl: string; // 스터디장 프로필 이미지 주소
        nickname: string; // 스터디장 닉네임
      };
      end: boolean; // 스터디 종료 여부
    },
  ];
}
interface Iparams {
  userId: string;
}

// interface CardProps {
//   studyInfo: {
//     id: number; //스터디 식별자
//     imgPath: string; //스터디 대표이미지 url
//     person: number; //현재 가입한 스터디원
//     max_person: number; //스터디 최대 가입 인원
//     description: string; //스터디 설명
//     viewCount: number; //스터디 조회수
//     lastVisitedTime: string; //최근 방문 시간.
//     leader: {
//       // 스터디장에 대한 정보
//       id: number; //스터디장 유저 식별자
//       imgPath: string; //스터디장 프로필 이미지 url
//       nickname: string; //스터디장 닉네임
//     };
//   };
// }

interface NumberOfCardsProps {
  NumberOfCards: number;
}

export default function MyStudyPages() {
  // 유저 아이디
  const userId = useParams<Iparams>().userId;

  // 에러 코드
  //유저의 스터디 목록 API로 받아오기
  const { isLoading: studiesLoading, data: studiesData } = useQuery(
    ["studies", userId],
    () => MyStudyApi(userId),
  );
  console.log("DATA : ", studiesData);
  console.log(studiesData);
  return (
    <>
      <BackgroundYellow bgHeight="50vw" />
      <BlankSpace />
      <Wrapper>
        <Header>
          <Title>내 스터디</Title>
          <Additionalection>
            <GraphContainer>
              <SubTitle>다른 내용</SubTitle>
              <GraphBox>
                <span>그래프</span>
              </GraphBox>
            </GraphContainer>
            <PurposeContainer>
              <SubTitle>내 목표</SubTitle>
              <PurposeBox>
                <span>오늘 공부한 시간</span>
              </PurposeBox>
            </PurposeContainer>
          </Additionalection>
        </Header>
        <CurrentContainer>
          <SubTitle>진행중 스터디</SubTitle>
          <Cards NumberOfCards={studiesData ? studiesData.current.length : 0}>
            {!studiesLoading && studiesData
              ? studiesData.current.map((study) => (
                  <CardWrapper>
                    <Card key={study.studyId} studyInfo={study} />
                  </CardWrapper>
                ))
              : null}
          </Cards>
        </CurrentContainer>
        <EndContainer>
          <SubTitle>지난 스터디</SubTitle>
          <SearchContainer>
            <SearchComponent />
          </SearchContainer>
          <Cards NumberOfCards={studiesData ? studiesData.end.length : 0}>
            {!studiesLoading && studiesData
              ? studiesData.end.map((study) => (
                  <Card key={study.studyId} studyInfo={study} />
                ))
              : null}
          </Cards>
        </EndContainer>
      </Wrapper>
    </>
  );
}
