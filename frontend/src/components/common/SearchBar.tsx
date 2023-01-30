import styled from "styled-components";
import searchIcon from "../../assets/img/search.png";
import BlankSpace from "./BlankSpace";

interface ISearchContainer {
  widthValue?: number;
  heightValue?: number;
  unit?: string;
}

const SSearchContainer = styled.div<ISearchContainer>`
  width: ${(props) => props.widthValue + props.unit! || "27.778vw"};
  height: ${(props) => props.heightValue + props.unit! || "3.333vw"};
  /* width: 27.778vw; */
  /* height: 3.333vw; */
  border: solid 1px black;
  border-radius: 0.694vw;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  opacity: 1;
`;

const SSearchIcon = styled.img.attrs({ src: searchIcon })`
  width: 2.222vw;
  height: 2.222vw;
`;

interface IInput {
  inputWidth: number;
  inputHeight: number;
  inputInnerText?: string;
  unit?: string;
}

const SSearchInput = styled.input.attrs((props: IInput) => ({
  type: "text",
  placeholder: props.inputInnerText,
  // placeholder: "궁금한 스터디를 검색하세요.",
}))<IInput>`
  width: ${(props) => props.inputWidth + props.unit! || "23vw"};
  height: ${(props) => props.inputHeight + props.unit! || "3.125vw"};
  /* width: 23vw;
  height: 3.125vw; */
  border: none;
  outline: none;
  -webkit-appearance: none;
  /* text-align: center; */
  /* margin-left: 10px; */
  overflow: auto; //검색어가 길어졌을때 오른쪽으로 자연스럽게 검색되도록 하기 위해
  /* z-index: -1; */
  font-size: ${(props) => props.inputWidth * 0.06 + props.unit!};
  /* font-size: 1.389vw; */
  ::placeholder {
    font-size: ${(props) => props.inputWidth * 0.06 + props.unit!};
    /* font-size: 1.389vw; */
  }
`;

interface ISearchProps {
  searchWidth?: number;
  searchHeight?: number;
  innerText?: string;
  unit?: string;
}

function SearchBar(props: ISearchProps) {
  const inputWidth = props?.searchWidth! * 0.83;
  const inputHeight = props?.searchHeight! * 0.94;
  return (
    <>
      <BlankSpace />
      <SSearchContainer
        widthValue={props.searchWidth}
        heightValue={props.searchHeight}
        unit={props.unit}
      >
        <SSearchInput
          inputWidth={inputWidth}
          inputHeight={inputHeight}
          inputInnerText={props.innerText}
          unit={props.unit}
        />
        <SSearchIcon />
      </SSearchContainer>
    </>
  );
}

export default SearchBar;
