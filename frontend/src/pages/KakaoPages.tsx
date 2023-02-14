import { LoginState } from "atoms/LoginAtom";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import jwt_decode from "jwt-decode";
interface ILoginToken {
  accessToken: string;
}

function KakaoPages() {
  const params = useParams<ILoginToken>();
  // const history = useHistory();

  const [tokenState, setTokenState] = useRecoilState(LoginState);

  const onJoin = async () => {
    if (tokenState !== null) {
      var decoded: any = jwt_decode(tokenState);
    } else {
      console.log("none");
    }

    await console.log(decoded?.userId);
  };

  useEffect(() => {
    if (params) {
      localStorage.setItem("kakao-token", params.accessToken);
    }
    if (localStorage.getItem("kakao-token")) setTokenState(true);
    // history.push("/");
    window.location.replace("/"); // 새로고침해야 token null 값 해결 돼서 임시방편으로 바꿈 ㅠ interceptor하는 법 찾아보기
    return () => {
      onJoin();
    };
  }, [params]);

  return <div></div>;
}

export default KakaoPages;
