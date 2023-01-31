import StudyNavBar from "components/common/StudyNavBar";
import styled from "styled-components";
import StudyManageCalendar from "../components/study-manage/StudyManageCalendar";
import StudyManageMain from "../components/study-manage/StudyManageMain";

// submenu 들어갈 자리
const SubMenu = styled.div`
  height: 11.667vw;
`;

function StudyManagePages() {
  return (
    <>
      <SubMenu>
        <StudyNavBar />
      </SubMenu>
      {/* <StudyManageMain /> */}
      <StudyManageCalendar />
    </>
  );
}

export default StudyManagePages;
