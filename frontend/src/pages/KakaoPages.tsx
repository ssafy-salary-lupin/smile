import { useParams } from "react-router-dom";

function KakaoPages() {
  const params = useParams();
  console.log("params : ", params);

  return (
    <div>
      카카오 로그인 페이지 입니다.... ^^
      {/* <br /> {params} */}
    </div>
  );
}

export default KakaoPages;
