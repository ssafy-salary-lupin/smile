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

const SearchBar = styled.div`
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div``;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* margin: 0 2.778vw; */
  margin: auto;
  @media screen and (min-width: 1680px) {
    justify-content: center;
    width: 1680px;
    margin: auto;
    /* margin: 0 40.003px; */
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3.889vw 0 5.556vw 0;
  @media screen and (min-width: 1680px) {
    margin: 56.002px 0 80.006px 0;
  }
`;

const Title = styled.h1`
  font-size: 3.333vw;
  font-weight: 600;
  @media screen and (min-width: 1680px) {
    font-size: 47.995px;
  }
`;

const SubTitle = styled.h2`
  font-size: 2.5vw;
  font-weight: 600;
  @media screen and (min-width: 1680px) {
    font-size: 36px;
  }
`;

const Additionalection = styled.div`
  display: flex;
  justify-content: space-around;
`;

const GraphContainer = styled.div``;

const PurposeBox = styled.div`
  width: 50vw;
  height: 27.778vw;
  background-color: #fffbf0;
  border-radius: 15px;
  @media screen and (min-width: 1680px) {
    width: 720px;
    height: 400.003px;
  }
`;

const PurposeContainer = styled.div``;

const StudyContainer = styled.div`
  display: flex;
`;

const StatusTitle = styled.summary`
  font-size: 2.5vw;
  font-weight: 600;
  cursor: pointer;
  @media screen and (min-width: 1680px) {
    font-size: 36px;
  }
`;

const Cards = styled.div<NumberOfCardsProps>`
  display: grid;
  grid-template-columns: repeat(3, 31.48vw);
  /* grid-template-rows: repeat(2, 38.889vw); */
  grid-template-rows: repeat(${(props) => props.NumberOfCards}, 38.889vw);
  margin-top: 2.8vw;
  @media screen and (min-width: 1680px) {
    grid-template-columns: repeat(3, 453.312px);
    /* grid-template-rows: repeat(2, 560.002px); */
    grid-template-rows: repeat(${(props) => props.NumberOfCards}, 560.002px);
    margin-top: 40.32px;
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

const DdayBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 94.444vw;
  height: 27.778vw;
  background-color: #fffbf0;
  border-radius: 15px;
  @media screen and (min-width: 1680px) {
    width: 1680px;
    height: 400.003px;
  }
`;

// const DdayBox = styled.div`
//   overflow-y: scroll;
//   height: 17.778vw;
//   &::-webkit-scrollbar {
//     width: 6px;
//   }
//   &::-webkit-scrollbar-thumb {
//     height: 17%;
//     background-color: ${(props) => props.theme.pointColor};
//     border-radius: 10px;
//   }
// `;

const Dday = styled.div`
  cursor: pointer;
  width: 90%;
  min-height: 2.778vw;
  height: auto;
  border: 1px solid rgb(118, 118, 118);
  box-shadow: 2px 2px 2px rgb(169, 169, 169);
  border-radius: 0.556vw;
  display: flex;
  flex-direction: row;
  margin-bottom: 0.556vw;
`;

const Tag = styled.div`
  background-color: #314e8d;
  border-radius: 0.556vw 0 0 0.556vw;
  width: 15%;
`;

const Text = styled.div`
  width: 85%;
  font-size: 0.972vw;
  line-height: 1.667vw;
  text-align: left;
  display: flex;
  align-items: center;
  padding: 0 1.111vw;
`;

const DdayItems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const DdayItem = styled.div``;

const DdayContent = styled.div`
  display: flex;
  justify-content: flex-start;
  div {
    :nth-child(1) {
    }
    :nth-child(2) {
    }
    span {
      font-size: 32px;
      font-weight: 600;
    }
  }
`;

const BlueBox = styled.div`
  border-radius: 15px 0 0 15px;
  background-color: #314e8d;
  width: 48px;
  height: 48px;
`;

const ContentBox = styled.div`
  display: flex;

  border-radius: 0 15px 15px 0;
  width: 500px;
  height: 48px;
  background-color: white;
`;

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

  const dDay = [
    {
      startTime: "2023-02-13T15:01:51.047Z",
      title: "일정 1",
    },
    {
      startTime: "2023-02-14T15:01:51.047Z",
      title: "일정 2",
    },
    {
      startTime: "2023-02-15T15:01:51.047Z",
      title: "일정 3",
    },
  ];

  interface DdayInfo {
    isSuccess: boolean;
    code: number;
    message: string;
    result: {
      id: number;
      day: number;
      title: string;
      studyName: string;
    }[];
  }

  const ddayInfo: DdayInfo = {
    isSuccess: true,
    code: 200,
    message: "성공",
    result: [
      {
        id: 1,
        day: 1,
        title: "스터디 참여",
        studyName: "SSAFY",
      },
      {
        id: 2,
        day: 2,
        title: "OO기업 서류 마감일",
        studyName: "대전 스터디",
      },
      {
        id: 3,
        day: 3,
        title: "OO시험 접수 마감",
        studyName: "OO시험 스터디",
      },
      {
        id: 4,
        day: 4,
        title: "스터디 참여",
        studyName: "OO 스터디",
      },
      {
        id: 5,
        day: 5,
        title: "OO기업 면접",
        studyName: "면접 스터디",
      },
    ],
  };

  return (
    <Wrapper>
      <BackgroundYellow bgHeight={65} />
      <BlankSpace />
      <Container>
        <Header>
          <Title>내 스터디</Title>
          <Additionalection>
            <GraphContainer>
              <SubTitle>일정</SubTitle>
              <DdayBox>
                {ddayInfo
                  ? ddayInfo.result.map((el, index) => (
                      <DdayItems>
                        <DdayItem>
                          <DdayContent>
                            <BlueBox />
                            <ContentBox>
                              <div>
                                <span>D-{el.day}</span>
                              </div>
                              <div>
                                <span>{el.title}</span>
                              </div>
                              <div>
                                <span>{el.studyName}</span>
                              </div>
                            </ContentBox>
                          </DdayContent>
                        </DdayItem>
                      </DdayItems>
                      // return (
                      //   <Dday key={index} onClick={() => showDdayModal(el.id)}>
                      //     <Tag></Tag>
                      //     <Text>
                      //       D-{el.day} {el.title}
                      //     </Text>
                      //   </Dday>
                      // );
                    ))
                  : null}
              </DdayBox>
            </GraphContainer>
            {/* <PurposeContainer>
              <SubTitle>내 목표</SubTitle>
              <PurposeBox>
                <span></span>
              </PurposeBox>
            </PurposeContainer> */}
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
      </Container>
    </Wrapper>
  );
}
