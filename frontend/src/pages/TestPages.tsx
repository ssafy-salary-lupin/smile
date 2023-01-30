// import StudyNavBar from "../components/common/StudyNavBar";
import Search from "../components/common/Search";

function TestPages() {
  return (
    <div>
      <Search
        searchWidth={28}
        searchHeight={3}
        innerText="궁금한 스터디를 검색하세요"
        unit="vw"
      />
      {/* <StudyNavBar /> */}
    </div>
  );
}

export default TestPages;
