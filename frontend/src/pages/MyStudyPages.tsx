import { MyStudyAllApi } from "apis/MyStudyApi";
import { useRecoilValue } from "recoil";

function MyStudyPages() {
  const A = MyStudyAllApi(1);
  console.log(A);
  return <div></div>;
}

export default MyStudyPages;
