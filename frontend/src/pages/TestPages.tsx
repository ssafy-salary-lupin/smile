// import StudyNavBar from "../components/common/StudyNavBar";
import Carousel from "components/common/Carousel";
import SearchBar from "../components/common/SearchBar";
// import Modal from "../components/common/Modal";
import StudyNavBar from "../components/study-manage/StudyNavBar";
import BlankSpace from "components/common/BlankSpace";
// import Select from "components/common/Select";

function TestPages() {
  const optionObj = {
    optionTitle: "스터디 유형",
    optionList: ["면접", "자격증", "외국어"],
  };
  // const optionList = ange(1, 7);
  return (
    <div>
      {/* <StudyNavBar /> */}
      <BlankSpace />
      {/* <Select optionObj={optionObj} /> */}
      {/* <Modal /> */}
      <Carousel />
    </div>
  );
}

export default TestPages;
