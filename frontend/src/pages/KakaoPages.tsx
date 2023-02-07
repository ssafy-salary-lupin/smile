import { LoginToken } from "atoms/LoginAtom";
import { useEffect } from "preact/hooks";
import { useHistory, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";

function KakaoPages() {
  const params = useParams();
  const history = useHistory();

  console.log("pramas 타입", typeof params);
  console.log("params : ", params);

  useEffect(() => {
    console.log("useEffect 실행");
  });
  // const [token, setToken] = useRecoilState(LoginToken);
  // useEffect(() => {
  //   console.log("param 타입 ", typeof params);
  //   // history.push("/");
  // }, [params]);

  return <div></div>;
}

export default KakaoPages;
