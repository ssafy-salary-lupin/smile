import ReactQuill from "react-quill";
import styled from "styled-components";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { ReactComponent as DeleteIcon } from "../../assets/icon/Delete.svg";
// import "../../assets/css/boardWriteQuill.css";

const Wrapper = styled.div`
  margin: 3.889vw 21.111vw;
  display: flex;
  flex-direction: column;
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

function StudyManageBoardWrite() {
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

  const [title, setTitle] = useState<string>(""); // 글 제목
  const [content, setContent] = useState<string>(""); // 글 내용
  const [typeId, setTypeId] = useState<number>(0); // 글 유형

  const handleTitle = (event: any) => {
    setTitle(event.target.value);
  };

  const handleContent = (event: any) => {
    setContent(event);
  };

  const handleTypeId = (event: any) => {
    setTypeId(Number(event.target.value));
  };

  const [selectedFile, setSelectedFile] = useState(null); // 파일
  const [fileNameList, setFileNameList] = useState<string[]>([]);
  const handleFileSelect = (event: any) => {
    console.log("event.target.files[0] : ", event.target.files[0]);
    console.log("event.target.files : ", event.target.files);

    const files = event.target.files;

    setSelectedFile(files);

    for (let i = 0; i < files.length; i++) {
      setFileNameList((oldDatas) => [...oldDatas, files[i].name]);
    }

    fileNameList.map((el) => console.log(el));
  };

  const onFileInput = () => {
    document.getElementById("inputFile")?.click();
  };

  const deleteFile = (index: any) => {
    console.log("삭제할 index 값 : ", index);

    const size = fileNameList.length;
    // 이름 리스트에서 해당 파일 이름 삭제
    setFileNameList([]);
    fileNameList.map((el, i) => {
      if (i !== index) {
        setFileNameList((old) => [...old, el]);
      }
    });

    // 파일 리스트에서 해당 파일 삭제

    // if (selectedFile !== null) {
    //   const tempFileList = [];
    //   setSelectedFile(null);
    //   for (let i = 0; i < size; i++) {
    //     tempFileList.push;
    //   }
    //   setSelectedFile(tempFileList);
    // }
  };

  const history = useHistory();

  const submit = async () => {
    if (typeId === 0) {
      alert("유형을 선택해 주세요. ");
      return;
    }
    if (title === "") {
      alert("제목을 입력해주세요.");
      return;
    }
    if (content === "") {
      alert("내용을 입력해주세요.");
      return;
    }

    const formData = new FormData();

    const data = {
      title: title,
      content: content,
      typeId: typeId,
    };

    formData.append("data", JSON.stringify(data));

    const files = selectedFile;
    if (files !== null) formData.append("files", files);

    console.log("files : ", files);
    console.log("formdata files 값 확인 : ", formData.get("files"));

    try {
      // https://i8b205.p.ssafy.io/be-api/studies/1/boards
      await axios.post(`/be-api/studies/1/boards`, formData, {
        headers: {
          // Authorization: `Bearer ${localStorage.getItem("kakao-token")}`,
          Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzU5MDIwNzUsImV4cCI6MTY3NTk4ODQ3NX0.hipxLmlwQVai65rVc4T2NEIYG-XlhlRN-gR8sVlbz73wd7-4SqKNBR687z_lJK20xQ0Wx_riJzCtKWMT2-LJ7A`,
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.log(error);
    }

    // history.push("/manage/board");
  };

  return (
    <Wrapper>
      <Bracket>
        <Sub1>말머리</Sub1>
        <Sub2>
          <Select name="bracket" onChange={handleTypeId}>
            <Option value="0">-- 말머리 --</Option>
            <Option value="1">공지</Option>
            <Option value="2">자료</Option>
            <Option value="3">일반</Option>
          </Select>
        </Sub2>
      </Bracket>
      <Title>
        <Sub1>제목</Sub1>
        <Sub2>
          <TitleInput
            placeholder="제목을 입력해주세요."
            onChange={handleTitle}
          />
        </Sub2>
      </Title>
      <Content>
        <Sub1>내용</Sub1>
        <Sub2>
          <ReactQuill
            theme="snow"
            value={content}
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
        <WriteBtn onClick={submit}>등록</WriteBtn>
        <CancelBtn>
          <Link to="/manage/board">취소</Link>
        </CancelBtn>
      </Button>
    </Wrapper>
  );
}

export default StudyManageBoardWrite;
