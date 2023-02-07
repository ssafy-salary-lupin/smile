import { LoginToken } from "atoms/LoginAtom";
import { useEffect } from "preact/hooks";
import { useHistory, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";

function KakaoPages() {
  const params = useParams();
  const history = useHistory();

  const [token, setToken] = useRecoilState(LoginToken);
  useEffect(() => {
    setToken("djdjgdfkjl");
    console.log("param 타입 ", typeof params);
    history.push("/");
  }, []);

  return <div></div>;
}

export default KakaoPages;
