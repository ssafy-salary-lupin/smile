import { LoginToken } from "atoms/LoginAtom";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";

interface ILoginToken {
  accessToken: string;
}

function KakaoPages() {
  const params = useParams<ILoginToken>();
  const history = useHistory();

  console.log("params : ", params);

  const [token, setToken] = useRecoilState(LoginToken);

  useEffect(() => {
    setToken(params.accessToken);
    history.push("/");
  }, [params]);

  return <div></div>;
}

export default KakaoPages;
