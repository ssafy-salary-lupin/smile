import { LoginState } from "atoms/LoginAtom";
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

  const [tokenState, setTokenState] = useRecoilState(LoginState);

  useEffect(() => {
    if (params) {
      localStorage.setItem("kakao-token", params.accessToken);
      console.log("localstorage 확인", localStorage.getItem("kakao-token"));
    }
    if (localStorage.getItem("kakao-token")) setTokenState(true);
    history.push("/");
  }, [params]);

  return <div></div>;
}

export default KakaoPages;
