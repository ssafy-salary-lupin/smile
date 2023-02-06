import PagiNation from "components/common/Pagination";
import { useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 3.889vw 21.111vw;
  display: flex;
  flex-direction: column;
`;

const Head = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1.111vw;
`;

const HeadSub1 = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.972vw;
  padding: 0 0.556vw;
`;

const HeadSub2 = styled.button`
  background-color: ${(props) => props.theme.mainColor};
  border: none;
  box-shadow: 2px 2px 2px ${(props) => props.theme.blackColorOpacity3};
  border-radius: 0.278vw;
  padding: 0.347vw 0.972vw;
  cursor: pointer;
  font-size: 0.972vw;
`;

const BoardListBox = styled.table`
  border-collapse: collapse;
`;

const Tbody = styled.tbody`
  border-top: 3px solid black;
`;

const Row = styled.tr`
  border-bottom: 1px solid black;
`;

const BoardNum = styled.td`
  padding: 1.667vw 0;
  text-align: center;
  width: 10%;
  font-size: 0.972vw;
`;

const BoardType = styled(BoardNum)`
  width: 15%;
`;

const TypeLabel1 = styled.div`
  background-color: red;
  border-radius: 2.083vw;
  color: white;
  padding: 0.139vw 0;
  font-size: 0.972vw;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.944vw;
`;

const TypeLabel2 = styled(TypeLabel1)`
  background-color: #314e8d;
`;

const BoardTitle = styled(BoardNum)`
  font-weight: bold;
  width: 45%;
  text-align: left;
`;

const BoardWriter = styled(BoardNum)`
  width: 15%;
`;

const BoardDate = styled(BoardNum)`
  color: ${(props) => props.theme.blackColorOpacity2};
  width: 15%;
`;

const NoArticle = styled.div`
  background-color: ${(props) => props.theme.subColor};
  height: 22.222vw;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 3px solid ${(props) => props.theme.blackColor};
  border-bottom: 3px solid ${(props) => props.theme.blackColor};
`;

function StudyManageBoardList() {
  const getList = async () => {
    const response = await fetch(
      `https://i8b205.p.ssafy.io/be-api/studies/1/boards`,
    );
    const data = response.json();

    console.log(data);
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <Wrapper>
      <Head>
        <HeadSub1>총 14건</HeadSub1>
        <HeadSub2>글 쓰기</HeadSub2>
      </Head>
      <BoardListBox>
        <Tbody>
          <Row>
            <BoardNum>14</BoardNum>
            <BoardType>
              <TypeLabel1>공지</TypeLabel1>
            </BoardType>
            <BoardTitle>글 제목이 적힌 부분입니다.</BoardTitle>
            <BoardWriter>홍길동</BoardWriter>
            <BoardDate>2023-01-12</BoardDate>
          </Row>
        </Tbody>
        {/* <NoArticle>글내용이 없습니다.</NoArticle> */}
      </BoardListBox>
      {/* <PagiNation page={page} size={size} totalElements={totalElements} /> */}
    </Wrapper>
  );
}

export default StudyManageBoardList;
