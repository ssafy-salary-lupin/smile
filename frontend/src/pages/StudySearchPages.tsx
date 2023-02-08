import BlankSpace from "components/common/BlankSpace";
import styled from "styled-components";
import { ReactComponent as HeaderImg } from "assets/icon/StudySearchImg.svg";
import SearchComponent from "components/common/SearchComponent";
import { StudySearchAll } from "apis/StudySearchApi";
import { useQuery } from "react-query";
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
  flex-direction: column;
  align-items: center;
  h1 {
    font-size: 2.778vw;
    font-weight: 600;
  }
  span {
  }
`;

// 스터디 생성 버튼을 감싸고 있는 div
const CreateBtnWrapper = styled.div`
  width: 94.444vw;
  display: flex;
  justify-content: flex-end;
  padding: 0 2.778vw;
  button {
    background-color: ${(props) => props.theme.mainColor};
    border: none;
    width: 16.667vw;
    height: 4.444vw;
    border-radius: 1.111vw;
  }
`;

const Section = styled.div``;

const Cards = styled.div``;

export default function StudySearchPages() {
  const { isLoading: studiesLoading, data: studiesData } = useQuery(
    "studies",
    () => {
      StudySearchAll();
    },
  );
  let n = 1;
  console.log("DATA:", studiesLoading, studiesData);
  console.log(
    "DATA:",
    useQuery(["study", n], () => {
      StudySearchAll();
      n += 1;
    }),
  );
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
          <SearchComponent />
          <CreateBtnWrapper>
            <button>스터디 생성</button>
          </CreateBtnWrapper>
        </Header>
        <Section></Section>
      </Wrapper>
    </>
  );
}
