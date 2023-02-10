import React, { useState } from "react";
import { MyStudyApi } from "apis/MyStudyApi";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";
import { BackgroundYellow } from "components/common/BackgroundYellow";
import styled from "styled-components";
import Card from "components/common/Card";
import BlankSpace from "components/common/BlankSpace";
import SearchComponent from "components/common/SearchComponent";
import { CaretDown, CaretUp } from "components/common/DuotonIcons";
import MyStudyNotFound from "components/common/MyStudyNotFound";

const SearchBar = styled.div``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 2.778vw;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3.889vw 0 5.556vw 0;
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
  background-color: #fffbf0;
  border-radius: 15px;
`;

const PurposeBox = styled.div`
  width: 50vw;
  height: 27.778vw;
  background-color: #fffbf0;
  border-radius: 15px;
`;

const PurposeContainer = styled.div``;

const StudyContainer = styled.div``;

const StatusTitle = styled.summary`
  font-size: 2.5vw;
  font-weight: 600;
  cursor: pointer;
`;

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

interface NumberOfCardsProps {
  NumberOfCards: number;
}

export default function MyStudyPages() {
  // 유저 아이디
  const userId = useParams<Iparams>().userId;
  const [isOpenCurrent, setIsOpenCurrent] = useState(false);
  const [isOpenEnd, setIsOpenEnd] = useState(false);
  // 에러 코드
  //유저의 스터디 목록 API로 받아오기
  const { isLoading: studiesLoading, data: studiesData } = useQuery(
    ["studies", userId],
    () => MyStudyApi(userId),
  );
  console.log("DATA : ", studiesData);
  console.log(studiesData);

  const foldNOpenCurrent = () => {
    setIsOpenCurrent(!isOpenCurrent);
  };

  const foldNOpenEnd = () => {
    setIsOpenEnd(!isOpenEnd);
  };
  return (
    <>
      <BackgroundYellow bgHeight="65vw" />
      <BlankSpace />
      <Wrapper>
        <Header>
          <Title>내 스터디</Title>
          <Additionalection>
            <GraphContainer>
              <SubTitle>다른 내용</SubTitle>
              <GraphBox>
                <span></span>
              </GraphBox>
            </GraphContainer>
            <PurposeContainer>
              <SubTitle>내 목표</SubTitle>
              <PurposeBox>
                <span></span>
              </PurposeBox>
            </PurposeContainer>
          </Additionalection>
        </Header>
        {!studiesLoading ? (
          <>
            <details open>
              <StatusTitle onClick={foldNOpenCurrent}>
                진행중 스터디
              </StatusTitle>
              <StudyContainer>
                {!studiesLoading && studiesData ? (
                  <Cards
                    NumberOfCards={studiesData ? studiesData.current.length : 0}
                  >
                    {studiesData.current.map((study) => (
                      <CardWrapper key={study.id}>
                        <Card studyInfo={study} />
                      </CardWrapper>
                    ))}
                  </Cards>
                ) : (
                  <MyStudyNotFound>
                    <h3>스터디를 찾을 수 없습니다.</h3>
                    <span>(나중에 이미지 혹은 무언가 추가)</span>
                  </MyStudyNotFound>
                )}
              </StudyContainer>
            </details>
            <details open>
              <StatusTitle onClick={foldNOpenEnd}>지난 스터디</StatusTitle>
              <StudyContainer>
                {!studiesLoading && studiesData ? (
                  <>
                    <SearchContainer>
                      <SearchComponent />
                    </SearchContainer>
                    <Cards
                      NumberOfCards={studiesData ? studiesData.end.length : 0}
                    >
                      {studiesData.end.map((study) => (
                        <Card key={study.id} studyInfo={study} />
                      ))}
                    </Cards>
                  </>
                ) : (
                  <MyStudyNotFound />
                )}
              </StudyContainer>
            </details>
          </>
        ) : (
          <span>로딩중 이미지 추가</span>
        )}
      </Wrapper>
    </>
  );
}
