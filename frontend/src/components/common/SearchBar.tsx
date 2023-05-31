import { useState } from "react";
import styled from "styled-components";
import searchIcon from "../../assets/img/search.png";
import { useRecoilState } from "recoil";
import { SearchNameState } from "atoms/SearchAtom";

interface ISearchContainer {
  widthValue: number;
  heightValue: number;
  unit: string;
}

const SSearchContainer = styled.div<ISearchContainer>`
  width: 27.778vw;
  height: 4vw;
  border: solid 1px black;
  border-radius: 0.694vw;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  opacity: 1;
  @media screen and (min-width: 1280px) {
    border-radius: 7.498px;
    width: 266.669px;
    height: 40px;
  }
`;

const SSearchIcon = styled.img.attrs({ src: searchIcon })`
  width: 2.222vw;
  height: 2.222vw;
  cursor: pointer;
  @media screen and (min-width: 1280px) {
    width: 24px;
    height: 24px;
  }
`;

interface IInput {
  inputWidth: number;
  inputHeight: number;
  inputInnerText: string;
  unit: string;
}

const SSearchInput = styled.input.attrs((props: IInput) => ({
  type: "text",
  placeholder: props.inputInnerText,
  // placeholder: "궁금한 스터디를 검색하세요.",
}))<IInput>`
  width: 23vw;
  height: 3.125vw;
  border: none;
  outline: none;
  -webkit-appearance: none;
  overflow: auto; //검색어가 길어졌을때 오른쪽으로 자연스럽게 검색되도록 하기 위해
  font-size: 1.38vw;
  @media screen and (min-width: 1280px) {
    font-size: 16px;
    width: 220.8px;
    height: 30px;
  }
  ::placeholder {
    font-size: 1.38vw;
    @media screen and (min-width: 1280px) {
      font-size: 16px;
    }
  }
`;

interface ISearchProps {
  searchWidth?: number;
  searchHeight?: number;
  innerText?: string;
  unit?: string;
}

const SearchForm = styled.form``;

const SearchBtn = styled.button``;

function SearchBar(props: ISearchProps) {
  const [searchName, setSearchName] = useRecoilState<string>(SearchNameState);
  const [inputValue, setInputValue] = useState<string>("");
  const inputWidth = props?.searchWidth! * 0.83;
  const inputHeight = props?.searchHeight! * 0.94;

  const textInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setSearchName(e.target.value);
  };
  console.log("INPUT", inputValue);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(inputValue);
    setSearchName(inputValue);
    setInputValue("");
  };

  const onSubmit = () => {
    console.log(inputValue);
    setSearchName(inputValue);
    setInputValue("");
  };

  return (
    <>
      <SSearchContainer
        widthValue={props.searchWidth || 27.778}
        heightValue={props.searchHeight || 3.333}
        unit={props.unit || "vw"}
      >
        <SearchForm onSubmit={handleSubmit}>
          <SSearchInput
            value={inputValue}
            onChange={textInput}
            inputWidth={inputWidth || 23}
            inputHeight={inputHeight || 3.125}
            inputInnerText={props.innerText || "궁금한 스터디를 검색하세요"}
            unit={props.unit || "vw"}
          />
        </SearchForm>
        {/* <SearchBtn> */}
        <SSearchIcon onClick={onSubmit} />
        {/* </SearchBtn> */}
      </SSearchContainer>
    </>
  );
}

export default SearchBar;
