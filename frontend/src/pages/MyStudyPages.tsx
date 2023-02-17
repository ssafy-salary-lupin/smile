import { MyStudyAllApi } from "apis/MyStudyApi";
import { useRecoilValue } from "recoil";
import { BackgroundYellow } from "components/common/BackgroundYellow";
import { useEffect } from "react";

function MyStudyPages() {
  useEffect(() => {
    // const A = MyStudyAllApi(1);
    // console.log(A);
  }, []);

  return (
    <>
      <BackgroundYellow />
      <div></div>
    </>
  );
}

export default MyStudyPages;
