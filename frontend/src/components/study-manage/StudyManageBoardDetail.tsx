import ProfileImg from "components/common/ProfileImg";
import styled from "styled-components";
import { ReactComponent as Time } from "../../assets/icon/Time.svg";
import { ReactComponent as Eye } from "../../assets/icon/Eye.svg";
import { ReactComponent as Comment } from "../../assets/icon/Comment.svg";
import { ReactComponent as Reply } from "../../assets/icon/Reply.svg";
import { Link, useHistory, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { boardSelectApi } from "apis/StudyManageBoardApi";
import ReactQuill from "react-quill";
import axios from "axios";
import { useState } from "react";
import { theme } from "theme";

const Wrapper = styled.div`
  margin: 3.889vw 21.111vw;
  display: flex;
  flex-direction: column;
  a,
  a:link,
  a:visited,
  a:hover,
  a:active {
    text-decoration: none;
    color: inherit;
  }
`;

const ArticleHeader = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1.111vw 0;
`;

const ArticleType = styled.div`
  background-color: red;
  border-radius: 2.083vw;
  color: white;
  padding: 0.139vw 0;
  font-size: 1.111vw;
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.944vw;
  margin-right: 1.667vw;
`;

const ArticleType2 = styled(ArticleType)`
  background-color: #314e8d;
`;

const ArticleType3 = styled(ArticleType)`
  background-color: #007c1f;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.389vw;
  font-weight: bold;
`;

const ArticleInfo = styled.div`
  padding: 1.111vw 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.blackColorOpacity2};
`;

const Writer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 0.556vw;
`;

const Name = styled.div`
  padding: 0 0.556vw;
  font-size: 1.111vw;
`;

const SubInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${(props) => props.theme.blackColorOpacity4};
`;

const Span = styled.span`
  margin-left: 0.556vw;
`;

const Date = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 0.556vw;
  font-size: 1.111vw;
`;

const Look = styled(Date)``;

const CommentCnt = styled(Date)``;

const ArticleContent = styled.div`
  height: auto;
  overflow: hidden;
  padding: 1.667vw 2.778vw;
  font-size: 1.111vw;
  line-height: 1.667vw;

  .quill {
    /* height: 27.778vw; */
    width: 100%;
    text-align: center;
  }

  .ql-container.ql-snow {
    border: 1px solid white;
    /* height: 25vw; */
    background-color: white;
  }

  blockquote {
    border-left: 0.556vw solid #ccc;
    margin: 0.694vw;
    padding-left: 0.694vw;
  }
`;

const FileBox = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
`;

const FileSub1 = styled.div`
  width: 15%;
  background-color: ${(props) => props.theme.subColor};
  text-align: center;
  padding: 0.556vw;
  border-radius: 0.278vw;
  margin-right: 0.556vw;
  font-size: 0.972vw;
`;

const FileSub2 = styled.div``;

const FileListLi = styled.li`
  display: flex;
  flex-direction: row;
  font-size: 0.972vw;
  padding: 0.278vw 0.556vw;
  list-style: none;
`;

const FileLink = styled.a`
  text-decoration: none;
`;

const ArticleBtn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 0.556vw 0;
`;

const UpdateBtn = styled.button`
  background-color: ${(props) => props.theme.pointColor};
  border: none;
  margin: 0 0.278vw;
  padding: 0.347vw 0.972vw;
  cursor: pointer;
  border-radius: 0.278vw;
  box-shadow: 2px 2px 2px ${(props) => props.theme.blackColorOpacity};
  font-size: 0.972vw;
  color: white;
`;

const DeleteBtn = styled(UpdateBtn)`
  background-color: ${(props) => props.theme.subColor};
  color: black;
`;

const ListBtn = styled(UpdateBtn)`
  background-color: ${(props) => props.theme.mainColor};
  color: black;
`;

const CommentHeader = styled.div`
  font-size: 1.111vw;
  font-weight: bold;
`;

const CommentInput = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 1.111vw 0vw;
  justify-content: space-evenly;
`;

const TextInput = styled.input`
  width: 85%;
  border: 1px solid ${(props) => props.theme.blackColorOpacity};
  padding: 0.417vw 1.111vw;
  border-radius: 3.472vw;
  font-size: 0.972vw;
`;

const WriteBtn = styled.button`
  border: none;
  padding: 0.347vw 0.972vw;
  cursor: pointer;
  border-radius: 0.278vw;
  background-color: ${(props) => props.theme.mainColor};
  box-shadow: 2px 2px 2px ${(props) => props.theme.blackColorOpacity};
  font-size: 0.972vw;
`;

const CommentList = styled.div`
  margin-top: 1.111vw;
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1.667vw 0;
`;

const CommentTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0.556vw;

  p {
    color: ${(props) => props.theme.blackColorOpacity2};
    font-size: 0.833vw;
  }
`;

const WriterName = styled.div`
  padding-left: 1.111vw;
  font-size: 1.111vw;
  font-weight: bold;
  margin-right: 1.667vw;
`;

const CommentContent = styled.div`
  padding-left: 2.778vw;
  display: flex;
  flex-direction: row;
  line-height: 1.667vw;
  margin-bottom: 0.556vw;
`;

const CommentTxt = styled.div`
  font-size: 0.972vw;
`;

const CommentFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding-left: 2.222vw;
  p {
    margin: 0;
    color: #c0c0c0;
  }
`;

const ComUpdateBtn = styled.button`
  cursor: pointer;
  font-size: 0.833vw;
  background-color: transparent;
  border: none;
  color: #c0c0c0;
`;

const ComDeleteBtn = styled(ComUpdateBtn)`
  margin: 0;
`;

const ComReplyBtn = styled(ComDeleteBtn)``;

const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 3.75vw;
  margin-top: 1.111vw;
  position: relative;
`;

const StyledReplyIcon = styled(Reply)`
  transform: rotate(180deg);
`;

const ReplyBox = styled.div`
  width: 100%;
  margin-left: 1.667vw;
  background-color: #efefef;
  box-shadow: 2px 2px 2px ${(props) => props.theme.blackColorOpacity};
  padding: 1.111vw;
  justify-content: center;
  display: flex;
  flex-direction: column;
  border-radius: 1.111vw;
  p {
    font-size: 1.111vw;
    font-weight: bold;
    margin: 0;
    margin-bottom: 0.972vw;
  }
`;

const ReplyInputBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ReplyInput = styled.input`
  width: 85%;
  margin-right: 1.111vw;
  border: 1px solid ${(props) => props.theme.blackColorOpacity};
  padding: 0.417vw 1.111vw;
  border-radius: 3.472vw;
  font-size: 0.972vw;
  height: auto;
`;

const ReplyBtn = styled(WriteBtn)``;
interface Data {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    studyId: number; // 스터디 식별자
    boardId: number; // 게시글 식별자
    boardType: {
      // 게시글 유형 정보
      id: number; // 게시글 유형 식별자
      name: string; // 게시글 유형
    };
    title: string; // 제목
    content: string; // 본문
    writer: {
      // 작성자 정보
      writerId: number; // 작성자 유저 식별자
      nickname: string; // 작성자 닉네임
      profileImageUrl: string; // 작성자 프로필 이미지
    };
    writeAt: string; // 게시글 작성일
    views: number; // 게시글 조회수
    commentCount: number; // 댓글 수
    comments: [
      // 댓글 정보
      {
        commentId: number; // 댓글 식별자
        content: string; // 댓글 내용
        writer: {
          // 댓글 작성자 정보
          writerId: number; // 댓글 작성자 유저 식별자
          nickname: string; // 댓글 작성자 닉네임
          profileImageUrl: string; // 댓글 작성자 프로필 이미지
        };
        writeAt: string; // 댓글 작성일
      },
    ];
    fileCount: number; // 업로드된 파일 수
    files: [
      {
        fileId: number; // 파일 식별자
        fileName: string; // 파일 이름
        sourceUrl: string; // 파일 주소
      },
    ];
  };
}

type Params = {
  boardId: string;
};

function StudyManageBoardDetail() {
  const { boardId } = useParams<Params>();

  const { data: detailData, refetch } = useQuery<Data>("detailData", () =>
    boardSelectApi(boardId),
  );

  const date = detailData?.result.writeAt.split("T")[0];
  const time = detailData?.result.writeAt.split("T")[1];
  let writeAt = "";
  if (time !== undefined) {
    writeAt = date + time;
  }

  const modules = {
    toolbar: false,
  };

  const history = useHistory();

  const onDelete = async () => {
    if (window.confirm("삭제하시겠습니까?")) {
      try {
        await axios.delete(
          `https://i8b205.p.ssafy.io/be-api/studies/1/boards/${boardId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("kakao-token")}`,
            },
          },
        );
      } catch (error) {
        console.log(error);
      }

      history.push("/manage/board");
    }
  };

  // 댓글작성
  // const BASE_URL = `https://i8b205.p.ssafy.io/be-api/studies`;
  const BASE_URL = `/be-api/studies`;

  const [comment, setComment] = useState("");

  const writeComment = async () => {
    const data = {
      content: comment,
    };

    try {
      await axios.post(
        `${BASE_URL}/1/boards/${boardId}/comments`,
        JSON.stringify(data),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("kakao-token")}`,
            // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYwMTE5MDcsImV4cCI6MTY3NjA5ODMwN30.CLPtmst0zj-HQDh4rFP0DTDuqFOHfFoeA9RP9Fp1Kqe32a2qxleAmPfkQ9mpvTraIP2I6VI6UgxNns-8JlPnVg`,
            "Content-Type": `application/json`,
          },
        },
      );
    } catch (error) {
      console.log(error);
    }

    setComment("");
    refetch();
  };

  // 대댓글 작성
  const [openReply, setOpenReply] = useState<boolean>(false);

  const openReplyInput = (parentId: Number) => {
    setOpenReply(!openReply);
  };

  return (
    <Wrapper>
      <ArticleHeader>
        {detailData?.result.boardType.name === "공지" ? (
          <ArticleType>{detailData?.result.boardType.name}</ArticleType>
        ) : detailData?.result.boardType.name === "자료" ? (
          <ArticleType2>{detailData?.result.boardType.name}</ArticleType2>
        ) : (
          <ArticleType3>{detailData?.result.boardType.name}</ArticleType3>
        )}

        <Title>{detailData?.result.title}</Title>
      </ArticleHeader>
      <ArticleInfo>
        <Writer>
          <ProfileImg width="2.222vw" />
          <Name>{detailData?.result.writer.nickname}</Name>
        </Writer>
        <SubInfo>
          <Date>
            <Time fill="#898989" width="1.389vw" />
            <Span>{writeAt}</Span>
          </Date>
          <Look>
            <Eye stroke="#898989" width="1.667vw" />
            <Span>{detailData?.result.views}</Span>
          </Look>
          <CommentCnt>
            <Comment fill="#898989" width="1.389vw" />
            <Span>{detailData?.result.commentCount}</Span>
          </CommentCnt>
        </SubInfo>
      </ArticleInfo>
      <ArticleContent>
        <ReactQuill
          theme="snow"
          value={detailData?.result.content}
          readOnly
          modules={modules}
        />
      </ArticleContent>
      <FileBox>
        <FileSub1>첨부 파일</FileSub1>
        <FileSub2>
          {detailData?.result.files ? (
            <ul>
              {detailData?.result.files.map((el, key) => {
                return (
                  <FileListLi key={el.fileId}>
                    <FileLink href={`${el.sourceUrl}`}>{el.fileName}</FileLink>
                  </FileListLi>
                );
              })}
            </ul>
          ) : null}
        </FileSub2>
      </FileBox>
      <ArticleBtn>
        <UpdateBtn>
          <Link to={`/manage/boardUpdate/${detailData?.result.boardId}`}>
            수정
          </Link>
        </UpdateBtn>
        <DeleteBtn onClick={onDelete}>삭제</DeleteBtn>
        <ListBtn>
          <Link to="/manage/board">목록</Link>
        </ListBtn>
      </ArticleBtn>
      <CommentHeader>댓글</CommentHeader>
      <CommentInput>
        <TextInput
          value={comment}
          type="text"
          placeholder="댓글을 입력하세요."
          onChange={(el) => setComment(el.target.value)}
        />
        <WriteBtn onClick={writeComment}>작성</WriteBtn>
      </CommentInput>
      <CommentList>
        {detailData?.result.comments.map((el, key) => {
          return (
            <CommentBox key={el.commentId}>
              <CommentTop>
                <ProfileImg width="2.222vw" />
                <WriterName>{el.writer.nickname}</WriterName>
                <p>
                  {el.writeAt.split("T")[0] + " " + el.writeAt.split("T")[1]}
                </p>
              </CommentTop>
              <CommentContent>
                <CommentTxt>{el.content}</CommentTxt>
              </CommentContent>
              <CommentFooter>
                <ComReplyBtn onClick={() => openReplyInput(el.commentId)}>
                  답변
                </ComReplyBtn>
                <p>·</p>
                <ComUpdateBtn>수정</ComUpdateBtn>
                <p>·</p>
                <ComDeleteBtn>삭제</ComDeleteBtn>
              </CommentFooter>
              {/* 답변 */}
              {openReply ? (
                <ReplyWrapper>
                  <StyledReplyIcon fill={theme.mainColor} width="1.389vw" />
                  <ReplyBox>
                    <p>답글</p>
                    <ReplyInputBox>
                      <ReplyInput placeholder="답변을 입력하세요." />
                      <ReplyBtn>작성</ReplyBtn>
                    </ReplyInputBox>
                  </ReplyBox>
                </ReplyWrapper>
              ) : null}
            </CommentBox>
          );
        })}
      </CommentList>
    </Wrapper>
  );
}

export default StudyManageBoardDetail;
