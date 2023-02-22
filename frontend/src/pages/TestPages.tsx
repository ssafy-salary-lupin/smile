// import StudyNavBar from "../components/common/StudyNavBar";
<<<<<<< HEAD
import SearchBar from "../components/common/SearchBar";
// import Modal from "../components/common/Modal";
import StudyNavBar from "../components/study-manage/StudyNavBar";
// import BlankSpace from "components/common/BlankSpace";
=======
import Carousel from "components/common/Carousel";
import SearchBar from "../components/common/SearchBar";
// import Modal from "../components/common/Modal";
import StudyNavBar from "../components/study-manage/StudyNavBar";
import BlankSpace from "components/common/BlankSpace";
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
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
<<<<<<< HEAD
      {/* <BlankSpace /> */}
      {/* <Select optionObj={optionObj} /> */}
      {/* <Modal /> */}
=======
      <BlankSpace />
      {/* <Select optionObj={optionObj} /> */}
      {/* <Modal /> */}
      <Carousel />
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
    </div>
  );
}

export default TestPages;
