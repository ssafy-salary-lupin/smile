import Swal from "sweetalert2";

export const LoginAlert = () => {
  const token = localStorage.getItem("kakao-token");
  if (!token) {
    Swal.fire({
      icon: "warning",
      title: "로그인이 필요한 서비스입니다.",
      text: "로그인 페이지로 이동합니다.",
    }).then((result) => {
      window.location.replace(
        "https://i8b205.p.ssafy.io/be-api/oauth2/authorization/kakao",
      );
    });
    return false;
  } else {
    return true;
  }
};
