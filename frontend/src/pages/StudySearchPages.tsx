import BlankSpace from "components/common/BlankSpace";
import styled, { keyframes } from "styled-components";
import { ReactComponent as HeaderImg } from "assets/icon/StudySearchImg.svg";
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
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    h1 {
      font-size: 2.778vw;
      font-weight: 600;
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
  button {
    background-color: ${(props) => props.theme.mainColor};
    border: none;
    width: 16.667vw;
    height: 4.444vw;
    border-radius: 1.111vw;
    font-size: 1.667vw;
    cursor: pointer;
    :hover {
      animation: ${BtnHover} 1s forwards;
    }
  }
`;

const Section = styled.div``;

const Cards = styled.div<CardsProps>`
  display: grid;
  grid-template-columns: repeat(3, 31.48vw);
  grid-template-rows: repeat(3, 38.889vw);
  margin-top: 2.8vw;
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
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

interface CardsProps {
  NumberOfCards: number;
}

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
  const searchValue = `/studies?${searchName ? "name=" + searchName : ""}&${
    searchType ? "type=" + searchType : ""
  }`;
  console.log("SEARCH", searchValue);

  // API 불러오기
  const { isLoading, refetch, data } = useQuery("studies", () =>
    StudySearchAll.api.get(searchValue),
  );

  useEffect(() => {
    if (!!searchValue) {
      refetch();
    }
  }, [searchValue, refetch]);

  console.log("DATA:", isLoading, data);
  // 스터디 더보기 클릭 여부를 확인하기 위한 state
  const [isClickMore, setIsClickMore] = useState<boolean>(false);
  // 스터디 더보기 필요 유 / 무
  const [moreStudies, setMoreStudies] = useState<boolean>(false);
  // 검색 할 스터디의 개수
  const [studiesNumber, setStudiesNumber] = useState<number>(0);
  // 스터디 리스트
  const [StudyList, setStudyList] = useState<StudiesDataType[]>([]);
  // 더 보기 스터디 리스트
  const [moreStudyList, setMoreStudyList] = useState<object[]>();
  // 높이
  const [position, setPosition] = useState(0);

  const [loadLine, setLoadLine] = useState(0);

  useEffect(() => {
    const cardNumber = StudyList ? StudyList.length : 0;
    console.log("호출");
    if (!data) {
      setStudiesNumber(0);
    } else if (cardNumber <= 9) {
      setStudiesNumber(cardNumber);
      setStudyList(data.data.result);
    } else {
      setStudiesNumber(9);
      setMoreStudies(true);
      setMoreStudyList(data.data.result.slice(10));
      setStudyList(data.data.result.slice(0, 10));
    }
  }, [StudyList, data, studiesNumber]);

  function onScroll() {
    setPosition(window.scrollY);
  }
  useEffect(() => {
    const wrapperTag = document.querySelector("#search-wrapper");
    if (wrapperTag) {
      setLoadLine(wrapperTag.clientHeight * 0.8);
    }
    window.addEventListener("scroll", onScroll);
  }, []);

  console.log("StudyList", StudyList);

  console.log(loadLine);
  console.log(position);
  console.log("MORE", moreStudies);

  if (loadLine <= position && moreStudyList) {
    console.log("TEST", moreStudyList);
    // setStudyList((prev) => [...prev, moreStudyList.slice(0, 10)]);
  }
  return (
    <>
      <BlankSpace />
      <Wrapper id={"search-wrapper"}>
        {!isLoading ? (
          <>
            <Header>
              <div>
                <h1>딱! 맞는 스터디를 찾아보세요!</h1>
                <span>아무말을 뭘로 적어야 하나 ㅎㅎㅎ</span>
              </div>
              <HeaderImg width="29.444vw" height="17.222vw" />
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
              {/* {pagesN > count && loadLine <= position ? (
                <>
                  {setCount(count + 1)}
                  <Cards NumberOfCards={studiesNumber}>
                    (
                    {StudyList.map((study: StudiesDataType) => (
                      <CardWrapper>
                        {console.log(study)}
                        <Card key={study.id} studyInfo={study} />
                      </CardWrapper>
                    ))}
                    )
                  </Cards>
                </>
              ) : null} */}
            </Section>
          </>
        ) : (
          <MyStudyNotFound>
            <SkeletonCards>
              {[...Array(9).keys()].map(() => (
                <LoadingWrapper>
                  <LoadingCard />
                </LoadingWrapper>
              ))}
            </SkeletonCards>
          </MyStudyNotFound>
        )}
      </Wrapper>
    </>
  );
}
