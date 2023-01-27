import styled from "styled-components";
import searchIcon from "../../assets/img/search.png";
import BlankSpace from "./BlankSpace";

interface ISearchContainer {
  width: number;
  height: number;
}

const SSearchContainer = styled.div<ISearchContainer>`
  display: flex;
  width: ${(props) => `${props.width}vw`};
  height: ${(props) => `${props.height}vw`};
  border: solid 1px black;
  border-radius: 0.7vw;
  opacity: 0.5;
  justify-content: space-around;
  align-items: center;
`;

const SSearchInnerText = styled.span`
  font-size: 1.4vw;
`;

const SSearchIcon = styled.img`
  width: 2.24vw;
  height: 2.24vw;
`;

interface ISearchProps {
  searchWidth: number;
  searchHeight: number;
  innerText: string;
}

function Search(props: ISearchProps) {
  return (
    <>
      <BlankSpace />
      <SSearchContainer width={props.searchWidth} height={props.searchHeight}>
        <SSearchInnerText>{props.innerText}</SSearchInnerText>
        <SSearchIcon src={searchIcon} />
      </SSearchContainer>
    </>
  );
}

export default Search;
