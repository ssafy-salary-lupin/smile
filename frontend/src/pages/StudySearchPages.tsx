import BlankSpace from "components/common/BlankSpace";
import styled, { keyframes } from "styled-components";
import { ReactComponent as StudyImg } from "assets/icon/StudySearchImg.svg";
import SearchComponent from "components/common/SearchComponent";
import { StudySearchAll } from "apis/StudySearchApi";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import Card from "components/common/Card";
import { AxiosError } from "axios";
import MyStudyNotFound from "components/common/MyStudyNotFound";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { SearchNameState, SearchTypeState } from "atoms/SearchAtom";
import LoadingCard from "components/common/LoadingCard";
import { useInView } from "react-intersection-observer";
// 스터디 조회 페이지 전체를 감사는 div
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 2.778vw;
`;

// 설명, 사진, 검색, 버튼이 있는 헤더 부분
const Header = styled.div`
  display: flex;
  margin: 2.222vw 0;
  @media screen and (min-width: 1680px) {
    margin: 31.997px 0;
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    h1 {
      font-size: 2.778vw;
      font-weight: 600;
      @media screen and (min-width: 1680px) {
        font-size: 40.003px;
      }
    }
    span {
    }
  }
`;

// 그림자 효과
const BtnHover = keyframes`
  from {

  }
  to {
    box-shadow: 0px 0px 1vw #666b70;
  }

`;

// 스터디 생성 버튼을 감싸고 있는 div
const CreateBtnWrapper = styled.div`
  width: 94.444vw;
  display: flex;
  justify-content: flex-end;
  padding: 0 2.778vw;
  margin: 1.111vw 0 2.222vw 0;
  @media screen and (min-width: 1680px) {
    width: 1359.994px;
    padding: 0 40.003px;
    margin: 15.998px 0 31.997px 0;
  }
  button {
    background-color: ${(props) => props.theme.mainColor};
    border: none;
    width: 16.667vw;
    height: 4.444vw;
    border-radius: 1.111vw;
    font-size: 1.667vw;
    cursor: pointer;
    @media screen and (min-width: 1680px) {
      width: 240.005px;
      height: 63.994px;
      border-radius: 15.998px;
      font-size: 24.005px;
    }
    :hover {
      animation: ${BtnHover} 1s forwards;
    }
  }
`;

const Section = styled.div``;

interface CardsProps {
  NumberOfCards: number;
}

const Cards = styled.div<CardsProps>`
  display: grid;
  grid-template-columns: repeat(3, 31.48vw);
  grid-template-rows: repeat(3, 38.889vw);
  margin-top: 2.8vw;
  cursor: pointer;
  @media screen and (min-width: 1680px) {
    grid-template-columns: repeat(3, 453.312px);
    grid-template-rows: repeat(3, 560.002px);
    margin-top: 40.32px;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const fadeOut = keyframes`
  from {
        opacity: 1;
    }
    to {
        opacity: 0;
        z-index: -1;
    }
`;

const SkeletonCards = styled.div`
  margin-top: 2.8vw;
  position: absolute;
  z-index: 999;
  display: grid;
  grid-template-columns: repeat(3, 31.48vw);
  grid-template-rows: repeat(3, 38.889vw);
  animation-name: ${fadeOut};
  animation-duration: 1s;
  animation-timing-function: ease-out;
  animation-delay: 1.5s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  @media screen and (min-width: 1680px) {
    margin-top: 40.32px;
    grid-template-columns: repeat(3, 453.312px);
    grid-template-rows: repeat(3, 560.002px);
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const HeaderImg = styled(StudyImg)`
  width: 29.444vw;
  height: 17.222vw;
  @media screen and (min-width: 1680px) {
    width: 423.994px;
    height: 247.997px;
  }
`;

interface StudiesDataType {
  id: number;
  imagePath: string;
  currentPerson: number;
  maxPerson: number;
  description: string;
  viewCount: number;
  lastVisitedTime: string;
  type: {
    id: number;
    name: string;
  };
  commentCount: number;
  leader: {
    id: number;
    imagePath: string;
    nickname: string;
  };
}
export default function StudySearchPages() {
  const searchName = useRecoilValue<string>(SearchNameState);
  const searchType = useRecoilValue<number[]>(SearchTypeState);

  // 스터디 더보기 필요 유 / 무
  const [moreStudies, setMoreStudies] = useState<boolean>(false);
  // 검색 할 스터디의 개수
  const [studiesNumber, setStudiesNumber] = useState<number>(0);
  // 스터디 리스트
  const [StudyList, setStudyList] = useState<StudiesDataType[]>([]);
  // 더 보기 스터디 리스트
  const [moreStudyList, setMoreStudyList] = useState<StudiesDataType[]>([]);

  const [searchValue, setSearchValue] = useState<string>("/studies");

  // API 불러오기
  const { isLoading, refetch, data } = useQuery("studies", () =>
    StudySearchAll.api.get(searchValue),
  );

  const [ref, inView] = useInView();

  // 검색 기능
  useEffect(() => {
    console.log(1);
    setSearchValue(
      `/studies?${searchName ? "name=" + searchName : ""}&${
        searchType ? "type=" + searchType : ""
      }`,
    );
  }, [searchName, searchType]);

  // 신규 검색어 입력 시 api 재 호출
  useEffect(() => {
    console.log(2);

    if (!!searchValue) {
      refetch();
    }
  }, [searchValue, refetch]);

  // 카드 분류하기
  useEffect(() => {
    console.log(3);

    const cardNumber = data?.data.result ? data.data.result.length : 0;

    if (!data) {
      console.log("3-1");
      setStudiesNumber(0);
      setMoreStudies(false);
    } else if (cardNumber <= 9) {
      console.log("3-2");
      setStudiesNumber(cardNumber);
      setStudyList(data.data.result.slice(0, 9));
      setMoreStudies(false);
    } else {
      console.log("3-3");
      setStudiesNumber(9);
      setMoreStudies(true);
      setMoreStudyList(data.data.result.slice(9));
      setStudyList(data.data.result.slice(0, 9));
      // setMoreStudyList((prev) => [...prev, data.data.result.slice(9)]);
      // setStudyList((prev) => [...prev, data.data.result.slice(0, 9)]);
    }
  }, [data, isLoading]);

  useEffect(() => {
    console.log(5);
    if (inView && !isLoading && moreStudyList) {
      StudyList &&
        moreStudyList &&
        setStudyList(StudyList.concat(moreStudyList.slice(0, 9)));
      setMoreStudyList(moreStudyList.slice(9));
    }
  }, [inView, isLoading]);

  // console.log("SEARCH", searchValue);
  console.log("DATA:", isLoading, data);
  // console.log("INVIEW", inView);
  console.log("NOW", StudyList);
  console.log("MORE", moreStudyList);
  return (
    <>
      <BlankSpace />
      <Wrapper id={"search-wrapper"}>
        {!isLoading && StudyList ? (
          <>
            <Header>
              <div>
                <h1>딱! 맞는 스터디를 찾아보세요!</h1>
                <span>아무말을 뭘로 적어야 하나 ㅎㅎㅎ</span>
              </div>
              <HeaderImg />
            </Header>
            <SearchComponent />
            <CreateBtnWrapper>
              <Link to={{ pathname: `/create` }}>
                <button>스터디 생성</button>
              </Link>
            </CreateBtnWrapper>
            <Section>
              <SkeletonCards>
                {[...Array(9).keys()].map((index) => (
                  <LoadingWrapper key={index}>
                    <LoadingCard />
                  </LoadingWrapper>
                ))}
              </SkeletonCards>

              <Cards NumberOfCards={studiesNumber}>
                {StudyList.map((study) => (
                  <CardWrapper key={study.id}>
                    <Card studyInfo={study} />
                  </CardWrapper>
                ))}
              </Cards>
            </Section>
          </>
        ) : (
          <MyStudyNotFound>
            <SkeletonCards>
              {[...Array(9).keys()].map((num) => (
                <LoadingWrapper key={num}>
                  <LoadingCard />
                </LoadingWrapper>
              ))}
            </SkeletonCards>
          </MyStudyNotFound>
        )}
      </Wrapper>
      <div id="test" ref={ref}></div>
    </>
  );
}
