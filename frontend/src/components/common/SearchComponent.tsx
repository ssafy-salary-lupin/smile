import styled from "styled-components";
import SearchBar from "./SearchBar";
import Select from "./Select";

const Wrapper = styled.div`
  display: flex;
  div {
    margin: 0 0.556vw;
  }
`;

export default function SearchComponent() {
  const studyOptionObj = {
    optionTitle: "스터디 유형",
    optionList: ["면접", "자격증", "외국어"],
  };
  const peopleOptionObj = {
    optionTitle: "모집 인원",
    optionList: ["1", "2", "3", "4", "5", "6"],
  };
  return (
    <Wrapper>
      <SearchBar />
      <Select optionObj={studyOptionObj} />
      <Select optionObj={peopleOptionObj} />
    </Wrapper>
  );
}
