import BlankSpace from "components/common/BlankSpace";
import styled, { keyframes } from "styled-components";
import { ReactComponent as HeaderImg } from "assets/icon/StudySearchImg.svg";
import SearchComponent from "components/common/SearchComponent";
import { StudySearchAll } from "apis/StudySearchApi";
import { useQuery } from "react-query";
import { useState } from "react";
import Card from "components/common/Card";
import { AxiosError } from "axios";
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
  margin: 1.111vw 0 3.889vw 0;
  button {
    background-color: ${(props) => props.theme.mainColor};
    border: none;
    width: 16.667vw;
    height: 4.444vw;
    border-radius: 1.111vw;
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
  /* grid-template-rows: repeat(2, 38.889vw); */
  grid-template-rows: repeat(${(props) => props.NumberOfCards} / 3, 38.889vw);
  margin-top: 2.8vw;
`;

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface CardsProps {
  NumberOfCards: number;
}

interface StudiesDataType {
  id: number;
  imgPath: string;
  person: number;
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
    imgPath: string;
    nickname: string;
  };
}
export default function StudySearchPages() {
  // API 불러오기
  const res = useQuery("studies", StudySearchAll);
  console.log("DATA:", res.isLoading, res.data);

  // 스터디 더보기 클릭 여부를 확인하기 위한 state
  const [isClickMore, setIsClickMore] = useState<boolean>(false);
  // 스터디 더보기 필요 유 / 무
  const [moreStudies, setMoreStudies] = useState<boolean>(false);
  // 검색 할 스터디의 개수
  const [studiesNumber, setStudiesNumber] = useState<number>(0);
  // 스터디 리스트
  const [StudyList, setStudyList] = useState<StudiesDataType[]>(
    res.data?.data.result,
  );
  // 더 보기 스터디 리스트
  const [moreStudyList, setMoreStudyList] = useState<object[]>();

  const cardNumber = StudyList ? StudyList.length : 0;

  if (res.isLoading) {
    return <span>로딩중...</span>;
  } else {
    console.log(res.data);

    if (!res.data) {
      setStudiesNumber(0);
    } else if (cardNumber <= 9) {
      setStudiesNumber(cardNumber);
    } else {
      setStudiesNumber(9);
      setMoreStudies(true);
      setMoreStudyList(StudyList.slice(10));
      setStudyList(StudyList.slice(0, 10));
    }

    return (
      <>
        <BlankSpace />
        <Wrapper>
          <Header>
            <div>
              <h1>딱! 맞는 스터디를 찾아보세요!</h1>
              <span>아무말을 뭘로 적어야 하나 ㅎㅎㅎ</span>
            </div>
            <HeaderImg width="29.444vw" height="17.222vw" />
          </Header>
          <SearchComponent />
          <CreateBtnWrapper>
            <button>스터디 생성</button>
          </CreateBtnWrapper>
          <Section>
            <Cards NumberOfCards={studiesNumber}>
              {/* (
              {StudyList.map((study: StudiesDataType) => (
                <CardWrapper>
                  <Card key={study.id} studyInfo={study} />
                </CardWrapper>
              ))}
              ) */}
            </Cards>
            {moreStudies ? (
              <>
                {isClickMore ? (
                  <Cards NumberOfCards={studiesNumber}>
                    {/* (
                    {StudyList.map((study: StudiesDataType) => (
                      <CardWrapper>
                        {console.log(study)}
                        <Card key={study.id} studyInfo={study} />
                      </CardWrapper>
                    ))}
                    ) */}
                  </Cards>
                ) : (
                  <></>
                )}
              </>
            ) : null}
          </Section>
        </Wrapper>
      </>
    );
  }
}
