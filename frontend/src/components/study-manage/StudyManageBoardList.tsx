import {
  boardListSelectAllApi,
  noticeSelectAllApi,
} from "apis/StudyManageBoardApi";
import { studyIdRecoil } from "atoms/StudyManage";
import PagiNation from "components/common/Pagination";
import { useEffect, useState } from "react";
import { useQueries, useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 3.889vw 21.111vw;
  display: flex;
  flex-direction: column;

  a {
    text-decoration: none;
    color: ${(props) => props.theme.blackColor};
  }
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
  width: 20%;
  padding-left: 1.111vw;
`;

const TypeLabel = styled.div<TypeProps>`
  background-color: ${(props) =>
    props.typeId === 1 ? "red" : props.typeId === 2 ? "#314e8d" : "#007c1f"};
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

const BoardTitle = styled(BoardNum)`
  font-weight: bold;
  width: 50%;
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
  font-size: 1.111vw;
`;

export interface TypeProps {
  typeId: number;
}

interface IData {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    page: number; // 현재 페이지 번호
    size: number; // 페이지당 사이즈
    totalPages: number; // 전체 페이지 수
    totalElements: number; // 전체 게시글 수
    hasContent: boolean; // 해당 페이지의 컨텐츠 유무 - 있으면 true 없으면  false
    hasPrevious: boolean; // 현재 페이지의 앞 페이지의 존재 유무
    hasNext: false; // 현재 페이지의 다음 페이지의 존재 유무
    content: [
      // 해당 페이지의 데이터
      {
        studyId: number; // 스터디 번호
        boardId: number; // 게시글 번호
        views: number; // 게시글의 조회 수
        title: string; // 게시글 제목
        writer: {
          // 게시글 작성자 정보
          writerId: number; // 작성자 유저 식별자
          nickname: string; // 작성자 닉네임
        };
        boardType: {
          // 게시글 유형 정보
          id: number; // 게시글 유형 식별자
          name: string; // 게시글 유형
        };
        writeAt: string; // 게시글 작성일
      },
    ];
    isFirst: boolean; // 첫 페이지 유무 - 첫 페이지면 true 아니면 false
    isLast: boolean; // 마지막 페이지 유무 - 마지막 페이지면 true 아니면 false
  };
}

interface ListData {
  studyId: number; // 스터디 번호
  boardId: number; // 게시글 번호
  views: number; // 게시글의 조회 수
  title: string; // 게시글 제목
  writer: {
    // 게시글 작성자 정보
    writerId: number; // 작성자 유저 식별자
    nickname: string; // 작성자 닉네임
  };
  boardType: {
    // 게시글 유형 정보
    id: number; // 게시글 유형 식별자
    name: string; // 게시글 유형
  };
  writeAt: string; // 게시글 작성일
}

function StudyManageBoardList() {
  // studyId값 가져오기
  const studyId = useRecoilValue(studyIdRecoil);
  console.log("studyId : ", studyId);

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [totalElements, setTotalElements] = useState(0);
  const [totalGeneralElements, setTotalGeneralElements] = useState(0);
  const [list, setList] = useState<ListData[]>(); // 일반 글
  const [notice, setNotice] = useState<ListData[]>(); // 공지 글

  const res = useQueries([
    {
      queryKey: ["listData"],
      queryFn: () => boardListSelectAllApi(page, size, studyId),
    },
    {
      queryKey: ["noticeData"],
      queryFn: () => noticeSelectAllApi(studyId),
    },
  ]);

  useEffect(() => {
    async function stateSet() {
      // 1. 가져온 data 값에서 총 게시글 개수 가져와서 set
      if (res[0].data !== undefined && res[1].data !== undefined) {
        await setTotalElements(
          res[0].data.result.totalElements + res[1].data.result.totalElements,
        );
        await setTotalGeneralElements(res[0].data.result.totalElements);
      }

      // 2. 해당 페이지의 데이터들을 배열에 담아줌 => 아래에서 배열의 각 요소별로 뽑아서 보여주기
      if (res[0].data !== undefined) {
        await setList(res[0]?.data.result.content);
      }

      if (res[1].data !== undefined) {
        await setNotice(res[1]?.data.result.content);
      }
    }

    stateSet();
  }, [res]);

  // 페이지 변환시 호출할 메소드 => page값 셋팅
  const handlePageChange = async (page: any) => {
    await setPage((old) => (old = page));
    res[0].refetch();
    res[1].refetch();
  };

  return (
    <Wrapper>
      <Head>
        <HeadSub1>총 {totalElements}건</HeadSub1>
        <HeadSub2>
          <Link to={`/manage/boardWrite/${studyId}`}>글 쓰기</Link>
        </HeadSub2>
      </Head>
      <BoardListBox>
        <Tbody>
          {notice !== null
            ? notice?.map((el, index) => {
                return (
                  <Row key={index}>
                    <BoardType>
                      <TypeLabel typeId={el.boardType.id}>
                        {el.boardType.name}
                      </TypeLabel>
                    </BoardType>
                    <BoardTitle>
                      <Link to={`/manage/boardDetail/${el.boardId}`}>
                        {el.title}
                      </Link>
                    </BoardTitle>
                    <BoardWriter>{el.writer.nickname}</BoardWriter>
                    <BoardDate>
                      {el.writeAt.split("T")[0] +
                        " " +
                        el.writeAt.split("T")[1]}
                    </BoardDate>
                  </Row>
                );
              })
            : null}
          {list !== null
            ? list?.map((el, index) => {
                return (
                  <Row key={index}>
                    <BoardType>
                      <TypeLabel typeId={el.boardType.id}>
                        {el.boardType.name}
                      </TypeLabel>
                    </BoardType>
                    <BoardTitle>
                      <Link to={`/manage/boardDetail/${el.boardId}`}>
                        {el.title}
                      </Link>
                    </BoardTitle>
                    <BoardWriter>{el.writer.nickname}</BoardWriter>
                    <BoardDate>
                      {el.writeAt.split("T")[0] +
                        " " +
                        el.writeAt.split("T")[1]}
                    </BoardDate>
                  </Row>
                );
              })
            : null}
        </Tbody>
      </BoardListBox>
      {list !== null && totalElements === 0 ? (
        <NoArticle>글내용이 없습니다.</NoArticle>
      ) : null}

      <PagiNation
        page={page}
        size={size}
        totalElements={totalGeneralElements}
        handlePageChange={handlePageChange}
      />
    </Wrapper>
  );
}

export default StudyManageBoardList;
