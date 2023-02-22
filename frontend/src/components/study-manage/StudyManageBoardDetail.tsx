import ProfileImg from "components/common/ProfileImg";
import styled from "styled-components";
import { ReactComponent as Time } from "../../assets/icon/Time.svg";
import { ReactComponent as Eye } from "../../assets/icon/Eye.svg";
import { ReactComponent as Comment } from "../../assets/icon/Comment.svg";
<<<<<<< HEAD
import ReactMarkdown from "react-markdown";
=======
import { ReactComponent as Reply } from "../../assets/icon/Reply.svg";
import { Link, useHistory, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import {
  boardSelectApi,
  commentDeleteApi,
  commentUpdateApi,
  deleteBoardApi,
  writeCommentApi,
} from "apis/StudyManageBoardApi";
import ReactQuill from "react-quill";
import { useEffect, useState } from "react";
import { TypeProps } from "./StudyManageBoardList";
import Swal from "sweetalert2";
import { useRecoilValue } from "recoil";
import { studyIdRecoil } from "atoms/StudyManage";
import { UserIdState } from "atoms/UserInfoAtom";
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3

const Wrapper = styled.div`
  margin: 3.889vw 21.111vw;
  display: flex;
  flex-direction: column;
<<<<<<< HEAD
=======
  a,
  a:link,
  a:visited,
  a:hover,
  a:active {
    text-decoration: none;
    color: inherit;
  }
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
`;

const ArticleHeader = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1.111vw 0;
`;

<<<<<<< HEAD
const ArticleType = styled.div`
  background-color: red;
=======
const TypeLabel = styled.div<TypeProps>`
  background-color: ${(props) =>
    props.typeId === 1 ? "red" : props.typeId === 2 ? "#314e8d" : "#007c1f"};
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
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
<<<<<<< HEAD
=======

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
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
`;

const FileBox = styled.div`
  display: flex;
<<<<<<< HEAD
  flex-direction: row;
  align-items: center;
`;

const FileSub1 = styled.div`
  width: 10%;
  background-color: ${(props) => props.theme.blackColorOpacity3};
  text-align: center;
  padding: 0.556vw;
  border-radius: 3.472vw;
  margin-right: 0.556vw;
=======
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
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
`;

const FileSub2 = styled.div``;

<<<<<<< HEAD
=======
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

>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
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

<<<<<<< HEAD
const CommentList = styled.div``;

function StudyManageBoardDetail() {
  const post =
    "# 안녕\n\n## 안녕\n\n### 안녕\n\n안녕\n\n**안녕**\n\n***안녕***\n\n****안녕****\n\n> ****안녕****\n\n1.  안녕\n\n*   안녕\n\n안녕\n";
=======
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

const CommentTxt = styled.input<InputProps>`
  font-size: 0.972vw;
  width: 100%;
  border: none;
  outline: none;
  /* border: 1px solid ${(props) => props.theme.blackColorOpacity}; */
  padding: 0.417vw 1.111vw;
  border-radius: 3.472vw;
  border: ${(props) => (!props.editState ? "none" : `1px solid black`)};
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

export interface InputProps {
  editState: boolean;
}

function StudyManageBoardDetail() {
  const studyId = useRecoilValue(studyIdRecoil);

  const modules = {
    toolbar: false,
  };

  const { boardId } = useParams<Params>();

  const { data: detailData, refetch } = useQuery<Data>(
    "detailData",
    async () => await boardSelectApi(boardId, studyId),
  );

  // 글 삭제
  const history = useHistory();
  const onDelete = async () => {
    Swal.fire({
      title: "게시글 삭제를 진행하겠습니까?",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then(async (result) => {
      if (result.isConfirmed) {
        deleteBoardApi(boardId, studyId);
        Swal.fire("삭제완료!", "", "success");
        refetch();
        // history.push("/manage/board/" + studyId);
        window.location.replace("/manage/board/" + studyId);
      }
    });
  };

  // 댓글작성
  const [comment, setComment] = useState("");
  const writeComment = async () => {
    const data = {
      content: comment,
    };
    await writeCommentApi(data, boardId, studyId);
    setComment("");
    refetch();
  };

  // 댓글 수정..
  const [selectedId, setSelectedId] = useState(null);
  const [reply, setReply] = useState<string>();
  const updateComment = async (parentId: any, currentContent: any) => {
    await setReply(currentContent);
    await setSelectedId(parentId);
  };
  const onUpdateComment = async (parentId: any) => {
    const data = {
      content: reply,
    };
    await commentUpdateApi(data, boardId, parentId, studyId);
    await setSelectedId(null);
    refetch();
  };

  // 댓글 삭제
  const deleteComment = async (commentId: any) => {
    Swal.fire({
      title: "댓글을 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await commentDeleteApi(boardId, commentId, studyId);
        await refetch();
        Swal.fire("삭제완료!", "", "success");
      }
    });
  };

  const [article, setArticle] = useState<Data>();
  const [writeAt, setWriteAt] = useState<string>();
  useEffect(() => {
    async function stateSet() {
      const date = detailData?.result.writeAt.split("T")[0];
      const time = detailData?.result.writeAt.split("T")[1];
      if (time !== undefined) {
        await setWriteAt(date + " " + time);
      }

      await setArticle(detailData);
    }
    stateSet();
  }, [detailData]);

  const userId = useRecoilValue(UserIdState);
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3

  return (
    <Wrapper>
      <ArticleHeader>
<<<<<<< HEAD
        <ArticleType>공지</ArticleType>
        <Title>제목입니다.</Title>
      </ArticleHeader>
      <ArticleInfo>
        <Writer>
          <ProfileImg width="2.222vw" />
          <Name>김싸피</Name>
=======
        {article !== undefined ? (
          <TypeLabel typeId={article?.result.boardType.id}>
            {article?.result.boardType.name}
          </TypeLabel>
        ) : null}
        <Title>{article?.result.title}</Title>
      </ArticleHeader>
      <ArticleInfo>
        <Writer>
          <ProfileImg
            width="2.222vw"
            imgUrl={article?.result.writer.profileImageUrl}
          />
          <Name>{article?.result.writer.nickname}</Name>
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
        </Writer>
        <SubInfo>
          <Date>
            <Time fill="#898989" width="1.389vw" />
<<<<<<< HEAD
            <Span>2023-12-23 13:49</Span>
          </Date>
          <Look>
            <Eye stroke="#898989" width="1.667vw" />
            <Span>15</Span>
          </Look>
          <CommentCnt>
            <Comment fill="#898989" width="1.389vw" />
            <Span>2</Span>
=======
            <Span>{writeAt}</Span>
          </Date>
          <Look>
            <Eye stroke="#898989" width="1.667vw" />
            <Span>{article?.result.views}</Span>
          </Look>
          <CommentCnt>
            <Comment fill="#898989" width="1.389vw" />
            <Span>{article?.result.commentCount}</Span>
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
          </CommentCnt>
        </SubInfo>
      </ArticleInfo>
      <ArticleContent>
<<<<<<< HEAD
        <ReactMarkdown>{post}</ReactMarkdown>
      </ArticleContent>
      <FileBox>
        <FileSub1>첨부 파일</FileSub1>
        <FileSub2>첨부파일 명</FileSub2>
      </FileBox>
      <ArticleBtn>
        <UpdateBtn>수정</UpdateBtn>
        <DeleteBtn>삭제</DeleteBtn>
        <ListBtn>목록</ListBtn>
      </ArticleBtn>
      <CommentHeader>댓글</CommentHeader>
      <CommentInput>
        <TextInput type="text" placeholder="댓글을 입력하세요." />
        <WriteBtn>작성</WriteBtn>
      </CommentInput>
      <CommentList></CommentList>
=======
        <ReactQuill
          theme="snow"
          value={article?.result.content}
          readOnly
          modules={modules}
        />
      </ArticleContent>
      <FileBox>
        <FileSub1>첨부 파일</FileSub1>
        <FileSub2>
          {article?.result.files ? (
            <ul>
              {article?.result.files.map((el, key) => {
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
        {userId === article?.result.writer.writerId ? (
          <>
            <UpdateBtn>
              <Link to={`/manage/boardUpdate/${article?.result.boardId}`}>
                수정
              </Link>
            </UpdateBtn>
            <DeleteBtn onClick={onDelete}>삭제</DeleteBtn>
          </>
        ) : null}

        <ListBtn>
          <Link to={`/manage/board/${studyId}`}>목록</Link>
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
        {article?.result.comments.map((el, index) => {
          return (
            <CommentBox key={index}>
              <CommentTop>
                <ProfileImg
                  width="2.222vw"
                  imgUrl={el.writer.profileImageUrl}
                />
                <WriterName>{el.writer.nickname}</WriterName>
                <p>
                  {el.writeAt.split("T")[0] + " " + el.writeAt.split("T")[1]}
                </p>
              </CommentTop>
              <CommentContent>
                {selectedId === el.commentId ? (
                  <CommentTxt
                    editState={true}
                    value={reply}
                    onChange={(el) => setReply(el.target.value)}
                  ></CommentTxt>
                ) : (
                  <CommentTxt
                    value={el.content}
                    readOnly
                    editState={false}
                  ></CommentTxt>
                )}
              </CommentContent>
              <CommentFooter>
                {userId === el.writer.writerId ? (
                  <>
                    {selectedId !== el.commentId ? (
                      <ComUpdateBtn
                        onClick={() => updateComment(el.commentId, el.content)}
                      >
                        수정
                      </ComUpdateBtn>
                    ) : (
                      <ComUpdateBtn
                        onClick={() => onUpdateComment(el.commentId)}
                      >
                        수정
                      </ComUpdateBtn>
                    )}
                    <p>·</p>
                    <ComDeleteBtn onClick={() => deleteComment(el.commentId)}>
                      삭제
                    </ComDeleteBtn>
                  </>
                ) : null}
              </CommentFooter>
            </CommentBox>
          );
        })}
      </CommentList>
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
    </Wrapper>
  );
}

export default StudyManageBoardDetail;
