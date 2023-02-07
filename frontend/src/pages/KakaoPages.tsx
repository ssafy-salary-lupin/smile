import { LoginToken } from "atoms/LoginAtom";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";

function KakaoPages() {
  const params = useParams();
  const history = useHistory();

  console.log("params : ", params);

  const [token, setToken] = useRecoilState(LoginToken);
  useEffect(() => {
    setToken(params);
    history.push("/");
  }, [params]);

  return <div></div>;
}

export default KakaoPages;
