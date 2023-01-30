import SearchBar from "../components/common/SearchBar";

function TestPages() {
  return (
    <div>
      <SearchBar
        searchWidth={28}
        searchHeight={3}
        innerText="궁금한 스터디를 검색하세요"
        unit="vw"
      />
    </div>
  );
}

export default TestPages;
