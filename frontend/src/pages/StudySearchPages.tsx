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
import { Link, useHistory } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { SearchNameState, SearchTypeState } from "atoms/SearchAtom";
import LoadingCard from "components/common/LoadingCard";
import { useInView } from "react-intersection-observer";
import { LoginAlert } from "components/common/LoginAlert";
import Footer from "components/common/Footer";
import NavBarSub from "components/common/NavBarSub";
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
  @media screen and (min-width: 1280px) {
    margin: 24px 0;
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    h1 {
      font-size: 2.778vw;
      font-weight: 600;
      @media screen and (min-width: 1280px) {
        font-size: 30px;
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
  @media screen and (min-width: 1280px) {
    width: 1020px;
    padding: 0 30px;
    margin: 12px 0 24px 0;
  }
  button {
    background-color: ${(props) => props.theme.mainColor};
    border: none;
    width: 16.667vw;
    height: 4.444vw;
    border-radius: 1.111vw;
    font-size: 1.667vw;
    cursor: pointer;
    @media screen and (min-width: 1280px) {
      width: 180px;
      height: 48px;
      border-radius: 12px;
      font-size: 18px;
    }
    :hover {
      /* animation: ${BtnHover} 1s forwards; */
      box-shadow: 0px 0px 1vw #666b70;
    }
    :active {
      /* box-shadow: 0px 0px 1vw #666b70; */
      box-shadow: 1.997px 1.997px 14px 0px #666b70 inset;
    }
  }
`;

const Section = styled.div`
  @media screen and (max-width: 1280px) {
    min-height: 100vw;
  }
`;

interface CardsProps {
  NumberOfCards: number;
}

const Cards = styled.div<CardsProps>`
  display: grid;
  grid-template-columns: repeat(3, 31.48vw);
  grid-template-rows: repeat(3, 38.889vw);
  margin-top: 2.8vw;
  cursor: pointer;
  @media screen and (min-width: 1280px) {
    grid-template-columns: repeat(3, 339.984px);
    grid-template-rows: repeat(3, 420px);
    margin-top: 30.24px;
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
  @media screen and (min-width: 1280px) {
    margin-top: 53.491px;
    grid-template-columns: repeat(3, 339.984px);
    grid-template-rows: repeat(3, 420px);
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
  @media screen and (min-width: 1280px) {
    width: 318px;
    height: 186px;
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

const NotFound = styled(MyStudyNotFound)`
  min-height: 116.667vw;
  @media screen and (min-width: 1280px) {
    min-height: 1120.003px;
  }
`;

export default function StudySearchPages() {
  const history = useHistory();
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
  console.log(searchType);
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
    setMoreStudyList(data?.data.result.slice(9));
    setStudyList(data?.data.result.slice(0, 9));
  }, [data]);

  useEffect(() => {
    console.log(5);
    if (inView && !isLoading && moreStudyList) {
      StudyList &&
        moreStudyList &&
        setStudyList(StudyList.concat(moreStudyList.slice(0, 9)));
      setMoreStudyList(moreStudyList.slice(9));
    }
  }, [inView, isLoading]);

  const goCreate = () => {
    const isLogin = LoginAlert();
    if (isLogin) {
      history.replace(`/create`);
    }
  };

  const goDetail = (id: number) => {
    const isLogin = LoginAlert();
    if (isLogin) {
      history.replace(`/detail/${id}`);
    }
  };

  // console.log("SEARCH", searchValue);
  console.log("DATA:", isLoading, data);
  // console.log("INVIEW", inView);
  console.log("NOW", StudyList);
  console.log("MORE", moreStudyList);

  const curPath = window.location.pathname;
  return (
    <>
      <NavBarSub curUrl={curPath} />
      <BlankSpace />
      <Wrapper id={"search-wrapper"}>
        <Header>
          <div>
            <h1>딱! 맞는 스터디를 찾아보세요!</h1>
            <span>원하는 스터디가 없으면 직접 만들어서 해봐요.</span>
          </div>
          <HeaderImg />
        </Header>
        <SearchComponent />
        <CreateBtnWrapper>
          {/* <Link to={{ pathname: `/create` }}> */}
          <button onClick={goCreate}>스터디 생성</button>
          {/* </Link> */}
        </CreateBtnWrapper>
        {!isLoading && StudyList ? (
          <>
            <Section id="TEST2">
              <SkeletonCards id="TEST">
                {[...Array(9).keys()].map((index) => (
                  <LoadingWrapper key={index}>
                    <LoadingCard />
                  </LoadingWrapper>
                ))}
              </SkeletonCards>

              <Cards NumberOfCards={studiesNumber}>
                {StudyList.map((study) => (
                  <CardWrapper
                    key={study.id}
                    onClick={() => {
                      goDetail(study.id);
                    }}
                  >
                    {/* <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={{
                        pathname: `/detail/${study.id}`, // 스터디 상세 조회 페이지 주소 입력하기
                      }}
                    > */}
                    <Card studyInfo={study} />
                    {/* </Link> */}
                  </CardWrapper>
                ))}
              </Cards>
            </Section>
          </>
        ) : (
          <NotFound>
            <SkeletonCards>
              {[...Array(9).keys()].map((num) => (
                <LoadingWrapper key={num}>
                  <LoadingCard />
                </LoadingWrapper>
              ))}
            </SkeletonCards>
          </NotFound>
        )}
      </Wrapper>
      <div id="test" ref={ref}></div>
      <Footer />
    </>
  );
}
