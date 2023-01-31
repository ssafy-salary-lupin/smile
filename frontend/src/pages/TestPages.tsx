
// import StudyNavBar from "../components/common/StudyNavBar";
import SearchBar from "../components/common/SearchBar";
import Modal from "../components/common/Modal";
import Select from "components/common/Select";
import BlankSpace from "components/common/BlankSpace";

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
      <Select optionObj={optionObj} />
      <Modal />
    </div>
  );
}

export default TestPages;
