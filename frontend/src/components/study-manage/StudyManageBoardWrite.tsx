import ReactQuill from "react-quill";
import styled from "styled-components";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";

const Wrapper = styled.div`
  margin: 3.889vw 21.111vw;
  display: flex;
  flex-direction: column;
`;

const Bracket = styled.div`
  flex-direction: row;
  display: flex;
  border-top: 1px solid ${(props) => props.theme.blackColorOpacity};
`;

const Title = styled(Bracket)``;

const Content = styled(Bracket)``;

const File = styled(Bracket)`
  border-bottom: 1px solid ${(props) => props.theme.blackColorOpacity};
`;

const Sub1 = styled.div`
  border-right: 1px solid ${(props) => props.theme.blackColorOpacity};
  width: 15%;
  text-align: center;
  padding: 1.111vw 0;
  font-size: 1.111vw;
  font-weight: bold;
`;

const Sub2 = styled.div`
  width: 85%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.556vw 1.667vw;
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

function StudyManageBoardWrite() {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ font: [] }],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ color: ["red", "#785412"] }],
      [{ background: ["red", "#785412", "yellow"] }],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "image",
    "background",
    "align",
    "size",
    "font",
  ];

  const [code, setCode] = useState("hellllo");
  const handleProcedureContentChange = (
    content: any,
    delta: any,
    source: any,
    editor: any,
  ) => {
    setCode(content);
  };

  return (
    <Wrapper>
      <Bracket>
        <Sub1>말머리</Sub1>
        <Sub2>
          <Select name="bracket">
            <Option value="0">-- 말머리 --</Option>
            <Option value="1">공지</Option>
            <Option value="2">서류</Option>
          </Select>
        </Sub2>
      </Bracket>
      <Title>
        <Sub1>제목</Sub1>
        <Sub2>
          <TitleInput placeholder="제목을 입력해주세요." />
        </Sub2>
      </Title>
      <Content>
        <Sub1>내용</Sub1>
        <Sub2>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={code}
            onChange={handleProcedureContentChange}
          />
        </Sub2>
      </Content>
      <File>
        <Sub1>파일 첨부</Sub1>
        <Sub2></Sub2>
      </File>
      <Button>
        <WriteBtn>등록</WriteBtn>
        <CancelBtn>취소</CancelBtn>
      </Button>
    </Wrapper>
  );
}

export default StudyManageBoardWrite;
