import styled from "styled-components";
import SearchBar from "./SearchBar";
import Select from "./Select";

const Wrapper = styled.div`
  display: flex;
  div {
    margin: 0 0.556vw;
    @media screen and (min-width: 1280px) {
      margin: 0 5.338px;
    }
  }
`;

export default function SearchComponent() {
  const studyOptionObj = {
    optionTitle: "스터디 유형",
    optionList: ["면접", "자격증", "외국어"],
  };

  return (
    <Wrapper>
      <SearchBar />
      <Select optionObj={studyOptionObj} />
      {/* <Select optionObj={peopleOptionObj} /> */}
    </Wrapper>
  );
}
