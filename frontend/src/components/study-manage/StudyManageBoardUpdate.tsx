import ReactQuill from "react-quill";
import styled from "styled-components";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import { ReactComponent as DeleteIcon } from "../../assets/icon/Delete.svg";
import { useQuery } from "react-query";
import { boardSelectApi } from "apis/StudyManageBoardApi";
import Swal from "sweetalert2";

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

const Bracket = styled.div`
  flex-direction: row;
  display: flex;
  border-top: 2px solid ${(props) => props.theme.blackColor};
`;

const Title = styled(Bracket)`
  border-top: 1px solid ${(props) => props.theme.blackColorOpacity};
`;

const Content = styled(Bracket)`
  border-top: 1px solid ${(props) => props.theme.blackColorOpacity};
`;

const File = styled(Bracket)`
  border-top: 1px solid ${(props) => props.theme.blackColorOpacity};
  border-bottom: 2px solid ${(props) => props.theme.blackColor};
`;

const Sub1 = styled.div`
  border-right: 1px solid ${(props) => props.theme.blackColorOpacity};
  width: 15%;
  text-align: left;
  padding: 1.111vw 1.111vw;
  font-size: 0.972vw;
  font-weight: bold;
  background-color: #f6f6f6;
`;

const Sub2 = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  padding: 0.556vw 1.667vw;
  height: auto;

  .quill {
    height: 27.778vw;
    width: 100%;
    text-align: center;
  }

  .ql-toolbar.ql-snow {
    border: 1px solid #000000ae;
    height: 2.778vw;
    background-color: #f6f6f6;
  }

  .ql-container.ql-snow {
    border: 1px solid #000000ae;
    height: 25vw;
    background-color: white;
  }

  blockquote {
    border-left: 0.556vw solid #ccc;
    margin: 0.694vw;
    padding-left: 0.694vw;
  }
`;

const Select = styled.select`
  width: 30%;
  padding: 0.5vw 0.5vw;
  border-radius: 0.139vw;
  border: 0.05vw solid ${(props) => props.theme.blackColorOpacity2};
  color: ${(props) => props.theme.blackColorOpacity2};
  font-size: 0.833vw;
  /* -webkit-appearance: none; */
  /* -moz-appearance: none; */
  &:focus {
    outline: none;
  }
`;

const Option = styled.option`
  /* background-color: black; */
  font-size: 0.833vw;
  color: ${(props) => props.theme.blackColorOpacity2};
  li {
    &:hover {
      background-color: black;
    }
  }
`;

const TitleInput = styled.input`
  font-size: 0.833vw;
  width: 100%;
  padding: 0.5vw 0.5vw;
  border-radius: 0.139vw;
  border: 0.05vw solid ${(props) => props.theme.blackColorOpacity2};
  &:focus {
    outline: none;
  }
`;

const Button = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 1.667vw;
`;

const WriteBtn = styled.div`
  background-color: ${(props) => props.theme.mainColor};
  border: none;
  margin: 0 0.278vw;
  padding: 0.347vw 0.972vw;
  cursor: pointer;
  border-radius: 0.278vw;
  box-shadow: 2px 2px 2px ${(props) => props.theme.blackColorOpacity};
  font-size: 1.111vw;
`;

const CancelBtn = styled(WriteBtn)`
  background-color: ${(props) => props.theme.pointColor};
  color: white;
`;

const InputFile = styled.input`
  width: 100%;
  display: none;
`;

const InputFileBtn = styled.button`
  background-color: ${(props) => props.theme.subColor};
  border: none;
  margin: 0 0.278vw;
  padding: 0.347vw 0.972vw;
  cursor: pointer;
  border-radius: 0.278vw;
  font-size: 1.111vw;
`;

const FileListUl = styled.ul`
  width: 100%;
  padding-left: 1.667vw;
`;

const FileListLi = styled.li`
  display: flex;
  flex-direction: row;
  font-size: 1.111vw;
  padding: 0.278vw 0;
  list-style: none;
`;

interface Data {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    studyId: number; // 스터디 식별자
    boardId: number; // 게시글 식별자
    boardType: {
      // 게시글 타입 정보
      typeId: number; // 게시글 유형 식별자
      type: string; // 게시글 유형 정보
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

function StudyManageBoardUpdate() {
  const { boardId } = useParams<Params>();

  const { data: detailData } = useQuery<Data>("detailData", () =>
    boardSelectApi(boardId),
  );

  useEffect(() => {
    for (let i = 0; i < selectedFile.length; i++) {
      setFileNameList((oldDatas) => [...oldDatas, selectedFile[i].fileName]);
    }
  }, []);

  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ size: ["small", false, "large", "huge"] }, { color: [] }],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
          { align: [] },
        ],
      ],
    },
    clipboard: { matchVisual: false },
  };

  const [title, setTitle] = useState<string | undefined>(
    detailData?.result.title,
  ); // 글 제목
  const [content, setContent] = useState<string | undefined>(
    detailData?.result.content,
  ); // 글 내용
  const [typeId, setTypeId] = useState<number | undefined>(
    detailData?.result.boardType.typeId,
  ); // 글 유형
  const [selectedFile, setSelectedFile] = useState<any>(
    detailData?.result.files,
  ); // 파일
  const [fileNameList, setFileNameList] = useState<string[]>([]); // 파일 이름

  const handleTitle = (event: any) => {
    setTitle(event.target.value);
  };

  const handleContent = (event: any) => {
    setContent(event);
  };

  const handleTypeId = (event: any) => {
    setTypeId(Number(event.target.value));
  };

  const handleFileSelect = (event: any) => {
    console.log("선택한 파일 : ", event.target.files);

    // 파일 추가
    setSelectedFile((old: any) => [...old, ...event.target.files]);

    // 파일 이름
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      setFileNameList((oldDatas) => [...oldDatas, files[i].name]);
    }
  };

  const onFileInput = () => {
    document.getElementById("inputFile")?.click();
  };

  const deleteFile = (index: any) => {
    // 이름 리스트에서 해당 파일 이름 삭제
    setFileNameList([]);
    fileNameList.map((el, i) => {
      if (i !== index) {
        setFileNameList((old) => [...old, el]);
      }
    });

    // 파일 리스트에서 해당 파일 삭제
    if (selectedFile !== null) {
      const tempFileList: any = [];
      for (let i = 0; i < selectedFile.length; i++) {
        if (i !== index) {
          tempFileList.push(selectedFile[i]);
        }
      }
      setSelectedFile(null);
      setSelectedFile(tempFileList);
    }
  };

  const history = useHistory();

  const submit = async () => {
    if (typeId === 0) {
      // alert("유형을 선택해 주세요. ");
      Swal.fire({
        icon: "error",
        title: "이런...",
        text: "유형을 선택해주세요!!",
      });
      return;
    }
    if (title === "") {
      // alert("제목을 입력해주세요.");
      Swal.fire({
        icon: "error",
        title: "이런...",
        text: "제목을 입력해주세요!!",
      });
      return;
    }
    if (content === "") {
      // alert("내용을 입력해주세요.");
      Swal.fire({
        icon: "error",
        title: "이런...",
        text: "내용을 입력해주세요!!",
      });
      return;
    }

    Swal.fire({
      title: "수정을 진행하겠습니까?",
      showCancelButton: true,
      confirmButtonText: "수정",
      cancelButtonText: "취소",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formData = new FormData();

        const data = {
          title: title,
          content: content,
          typeId: typeId,
        };

        formData.append("data", JSON.stringify(data));

        if (selectedFile !== null) {
          for (let i = 0; i < selectedFile.length; i++) {
            formData.append("files", selectedFile[i]);
          }
        }

        try {
          await axios.patch(
            `https://i8b205.p.ssafy.io/be-api/studies/1/boards/${boardId}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("kakao-token")}`,
                "Content-Type": "multipart/form-data",
              },
            },
          );
        } catch (error) {
          console.log(error);
        }

        history.push("/manage/board");
        Swal.fire("수정완료!", "", "success");
      }
    });
    // if (window.confirm("수정 하시겠습니까?")) {
    //   const formData = new FormData();

    //   const data = {
    //     title: title,
    //     content: content,
    //     typeId: typeId,
    //   };

    //   formData.append("data", JSON.stringify(data));

    //   if (selectedFile !== null) {
    //     for (let i = 0; i < selectedFile.length; i++) {
    //       formData.append("files", selectedFile[i]);
    //     }
    //   }

    //   try {
    //     await axios.patch(
    //       `https://i8b205.p.ssafy.io/be-api/studies/1/boards/${boardId}`,
    //       formData,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${localStorage.getItem("kakao-token")}`,
    //           "Content-Type": "multipart/form-data",
    //         },
    //       },
    //     );
    //   } catch (error) {
    //     console.log(error);
    //   }

    //   history.push("/manage/board");
    // }
  };

  return (
    <Wrapper>
      <Bracket>
        <Sub1>말머리</Sub1>
        <Sub2>
          <Select name="bracket" onChange={handleTypeId}>
            <Option value="0">-- 말머리 --</Option>
            {detailData?.result.boardType.typeId === 1 ? (
              <Option value="1" selected>
                공지
              </Option>
            ) : (
              <Option value="1">공지</Option>
            )}
            {detailData?.result.boardType.typeId === 2 ? (
              <Option value="2" selected>
                자료
              </Option>
            ) : (
              <Option value="2">자료</Option>
            )}
            {detailData?.result.boardType.typeId === 3 ? (
              <Option value="3" selected>
                일반
              </Option>
            ) : (
              <Option value="3">일반</Option>
            )}
          </Select>
        </Sub2>
      </Bracket>
      <Title>
        <Sub1>제목</Sub1>
        <Sub2>
          <TitleInput
            placeholder="제목을 입력해주세요."
            onChange={handleTitle}
            value={detailData?.result.title}
          />
        </Sub2>
      </Title>
      <Content>
        <Sub1>내용</Sub1>
        <Sub2>
          <ReactQuill
            theme="snow"
            value={detailData?.result.content}
            onChange={handleContent}
            modules={modules}
          />
        </Sub2>
      </Content>
      <File>
        <Sub1>첨부파일</Sub1>
        <Sub2>
          <InputFile
            type="file"
            id="inputFile"
            onChange={handleFileSelect}
            multiple
          />
          <InputFileBtn onClick={onFileInput}>파일 첨부</InputFileBtn>
          {fileNameList.length > 0 ? (
            <FileListUl>
              {fileNameList.map((el, index) => {
                return (
                  <>
                    <FileListLi>
                      {el}
                      <DeleteIcon
                        width="1.111vw"
                        height="1.111vw"
                        fill="#ff0000"
                        cursor="pointer"
                        onClick={() => deleteFile(index)}
                      />
                    </FileListLi>
                  </>
                );
              })}
            </FileListUl>
          ) : null}
        </Sub2>
      </File>
      <Button>
        <WriteBtn onClick={submit}>수정 완료</WriteBtn>
        <CancelBtn>
          <Link to="/manage/board">취소</Link>
        </CancelBtn>
      </Button>
    </Wrapper>
  );
}

export default StudyManageBoardUpdate;
