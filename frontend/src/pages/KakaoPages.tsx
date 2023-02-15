import { LoginState } from "atoms/LoginAtom";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { UserIdState } from "atoms/UserInfoAtom";
import jwt_decode from "jwt-decode";
import styled from "styled-components";
interface ILoginToken {
  accessToken: string;
}

function KakaoPages() {
  interface decodeType {
    exp: number;
    iat: number;
    iss: string;
    role: string;
    userEmail: string;
    userId: number;
  }

  const params = useParams<ILoginToken>();
  const history = useHistory();

  const [tokenState, setTokenState] = useRecoilState(LoginState);
  // const [userIdState, setUserIdState] = useRecoilState(UserIdState);

  // const goMyStudy = async () => {
  //   if (params.accessToken !== null) {
  //     const decodeData: decodeType = await jwt_decode(params.accessToken);
  //     console.log("decodeData.userId : ", decodeData.userId);

  //     await setUserIdState(decodeData.userId);

  //     console.log("userIdRecoil : ", userIdState);
  //     console.log("tokenState : ", tokenState);

  //     window.location.replace("/");

  //   } else {
  //     console.log("none");
  //   }
  // };

  useEffect(() => {
    if (params) {
      localStorage.setItem("kakao-token", params.accessToken);
    }
    if (localStorage.getItem("kakao-token")) setTokenState(true);
    history.push("/");
    // goMyStudy();
  }, [params]);

  return null;
}

export default KakaoPages;
