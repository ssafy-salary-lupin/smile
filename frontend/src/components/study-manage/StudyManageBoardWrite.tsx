import ReactQuill from "react-quill";
import styled from "styled-components";
import "react-quill/dist/quill.snow.css";
import { useRef, useState } from "react";
import axios from "axios";
import Editor, { EditorContentChanged } from "./Editor";
import { Link, useHistory } from "react-router-dom";

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
  flex-direction: row;
  align-items: center;
  padding: 0.556vw 1.667vw;
  height: auto;
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

const FileDeleteBtn = styled.button``;

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

  // react - quill
  // const [editorHtmlValue, setEditorHtmlValue] = useState<string>("");
  // const [editorMarkdownValue, setEditorMarkdownValue] = useState<string>("");

  // const onEditorContentChanged = (content: EditorContentChanged) => {
  //   setEditorHtmlValue(content.html);
  //   setEditorMarkdownValue(content.markdown);
  // };

  const [title, setTitle] = useState<string>(""); // 글 제목
  const [content, setContent] = useState<string>(""); // 글 내용
  const [typeId, setTypeId] = useState<number>(0); // 글 유형
  const [selectedFile, setSelectedFile] = useState(null); // 파일

  const handleTitle = (event: any) => {
    setTitle(event.target.value);
  };

  const handleContent = (event: any) => {
    setContent(event);
  };

  const handleTypeId = (event: any) => {
    setTypeId(Number(event.target.value));
  };

  const [fileNameList, setFileNameList] = useState<string[]>([]);
  const handleFileSelect = (event: any) => {
    setSelectedFile(event.target.files[0]);
    console.log("event.target.files[0] : ", event.target.files[0]);
    console.log("event.target.files : ", event.target.files);

    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
      console.log(files[i].name);
      setFileNameList([...fileNameList, files[i].name]);
    }
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
      await axios.post(
        `https://i8b205.p.ssafy.io/be-api/studies/1/boards`,
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
          {/* <Editor onChange={onEditorContentChanged} /> */}
        </Sub2>
      </Content>
      <File>
        <Sub1>첨부파일</Sub1>
        <Sub2>
          <input type="file" onChange={handleFileSelect} multiple />
          {fileNameList.length > 0 ? (
            <ul>
              {fileNameList.map((el) => {
                return <li>el.name</li>;
              })}
            </ul>
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
