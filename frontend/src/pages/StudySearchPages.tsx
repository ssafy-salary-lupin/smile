import BlankSpace from "components/common/BlankSpace";
import styled, { keyframes } from "styled-components";
import { ReactComponent as HeaderImg } from "assets/icon/StudySearchImg.svg";
import SearchComponent from "components/common/SearchComponent";
import { StudySearchAll } from "apis/StudySearchApi";
import { useQuery } from "react-query";
import { useState } from "react";
import Card from "components/common/Card";
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
  grid-template-rows: repeat(${(props) => props.NumberOfCards}, 38.889vw);
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

export default function StudySearchPages() {
  // API 불러오기
  const { isLoading: studiesLoading, data: studiesData } = useQuery(
    "studies",
    () => {
      StudySearchAll();
    },
  );
  console.log("DATA:", studiesLoading, studiesData);

  if (studiesData === undefined) {
  } else if (studiesData.result.length)
    // 스터디 더보기 클릭 여부를 확인하기 위한 state
    const [moreStudies, setMoreStudies] = useState<boolean>(false);
  return (
    <>
      <BlankSpace />
      {studiesLoading ? (
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
            <Cards NumberOfCards={studiesData ? studiesData.current.length : 0}>
              (
              {studiesData.current.map((study) => (
                <CardWrapper>
                  <Card key={study.studyId} studyInfo={study} />
                </CardWrapper>
              ))}
              )
            </Cards>
            {moreStudies ? null : <></>}
          </Section>
        </Wrapper>
      ) : (
        <span>로딩중</span>
      )}
    </>
  );
}
