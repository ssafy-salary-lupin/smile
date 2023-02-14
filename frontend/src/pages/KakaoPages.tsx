import { LoginState } from "atoms/LoginAtom";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { UserIdState } from "atoms/UserInfoAtom";
import jwt_decode from "jwt-decode";
interface ILoginToken {
  accessToken: string;
}

function KakaoPages() {
  const params = useParams<ILoginToken>();
  // const history = useHistory();

  const [tokenState, setTokenState] = useRecoilState(LoginState);
  const [userIdState, setUserIdState] = useRecoilState(UserIdState);
  const onJoin = async () => {
    if (params.accessToken !== null) {
      var decoded: any = jwt_decode(params.accessToken);
    } else {
      console.log("none");
    }

    await console.log(decoded?.userId);
    await setUserIdState(decoded?.userId);
  };

  // useEffect(() => {
  //   onJoin();
  //   return () => {
  //     onJoin();
  //   };
  // }, []);

  useEffect(() => {
    if (params) {
      localStorage.setItem("kakao-token", params.accessToken);
    }
    if (localStorage.getItem("kakao-token")) setTokenState(true);
    // history.push("/");

    onJoin();

    window.location.replace("/"); // 새로고침해야 token null 값 해결 돼서 임시방편으로 바꿈 ㅠ interceptor하는 법 찾아보기
  }, [params]);
  console.log("LOGIN");
  return <div></div>;
}

export default KakaoPages;
