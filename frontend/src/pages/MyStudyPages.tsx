import React, { useEffect, useState } from "react";
import { MyStudyApi } from "apis/MyStudyApi";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { BackgroundYellow } from "components/common/BackgroundYellow";
import styled from "styled-components";
import Card from "components/common/Card";
import BlankSpace from "components/common/BlankSpace";
import SearchComponent from "components/common/SearchComponent";
import MyStudyNotFound from "components/common/MyStudyNotFound";

import PostIt from "components/common/PostIt";
// import Swal from "sweetalert2";

import { LoginAlert } from "components/common/LoginAlert";
import Footer from "components/common/Footer";
import NavBarMain from "components/common/NavBarMain";

const Wrapper = styled.div``;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* margin: 0 2.778vw; */
  /* margin: auto; */
  margin: 0 2.5vw;
  @media screen and (min-width: 1280px) {
    justify-content: center;
    width: 960px;
    margin: auto;
    /* margin: 0 40.003px; */
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3.889vw 0 5.556vw 0;
  @media screen and (min-width: 1280px) {
    margin: 37.334px 0 53.338px 0;
  }
`;

const Title = styled.h1`
  font-size: 3.333vw;
  font-weight: 600;
  @media screen and (min-width: 1280px) {
    font-size: 31.997px;
  }
`;

const SubTitle = styled.h2`
  font-size: 2.5vw;
  font-weight: 600;
  @media screen and (min-width: 1280px) {
    font-size: 24px;
  }
`;

const Additionalection = styled.div`
  display: flex;
  justify-content: space-around;
`;

const GraphContainer = styled.div``;

const StudyContainer = styled.div`
  display: flex;
  flex-direction: column;
  :first-child {
    margin-bottom: 3.333vw;
    @media screen and (min-width: 1280px) {
      margin-bottom: 31.997px;
    }
  }
`;

const StatusTitle = styled.summary`
  font-size: 2.5vw;
  font-weight: 600;
  cursor: pointer;
  margin: 3.333vw 0;
  @media screen and (min-width: 1280px) {
    font-size: 24px;
    margin: 31.997px 0;
  }
`;

const Cards = styled.div<NumberOfCardsProps>`
  display: grid;
  grid-template-columns: repeat(3, 31.48vw);
  /* grid-template-rows: repeat(2, 38.889vw); */
  grid-template-rows: repeat(${(props) => props.NumberOfCards / 3}, 38.889vw);
  margin-top: 2.8vw;
  @media screen and (min-width: 1280px) {
    grid-template-columns: repeat(3, 302.208px);
    /* grid-template-rows: repeat(2, 373.334px); */
    grid-template-rows: repeat(
      ${(props) => props.NumberOfCards / 3},
      373.334px
    );
    margin-top: 26.88px;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 28.442px 0;
  @media screen and (min-width: 100vw) {
    margin: 21.331px 0;
  }
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
  useEffect(() => {
    //TODO
    // LoginAlert();
  }, []);

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

  const curPath = window.location.pathname;
  return (
    <>
      <NavBarMain curUrl={curPath} />
      <Wrapper>
        <BackgroundYellow bgHeight={65} />
        <BlankSpace />
        <Container>
          <Header>
            <Title>내 스터디</Title>
            <Additionalection>
              <GraphContainer>
                {/* <SubTitle>메모</SubTitle> */}
                <div id="react-container">
                  <PostIt></PostIt>
                </div>
              </GraphContainer>
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
                      NumberOfCards={
                        studiesData ? studiesData.current.length : 0
                      }
                    >
                      {studiesData.current.map((study) => (
                        <CardWrapper key={study.id}>
                          <Link
                            style={{ textDecoration: "none", color: "black" }}
                            to={{
                              pathname: `/manage/${study.id}`, // 스터디 상세 조회 페이지 주소 입력하기
                            }}
                          >
                            <Card studyInfo={study} />
                          </Link>
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
                      {/* <SearchContainer>
                      <SearchComponent />
                    </SearchContainer> */}
                      <Cards
                        NumberOfCards={studiesData ? studiesData.end.length : 0}
                      >
                        {studiesData.end.map((study) => (
                          <Link
                            style={{ textDecoration: "none", color: "black" }}
                            to={{
                              pathname: `/manage/${study.id}`, // 스터디 상세 조회 페이지 주소 입력하기
                            }}
                          >
                            <Card key={study.id} studyInfo={study} />
                          </Link>
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
        </Container>
      </Wrapper>
      <Footer />
    </>
  );
}
