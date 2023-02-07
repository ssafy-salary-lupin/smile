import axios from "axios";

const BASE_URL = `https://i8b205.p.ssafy.io/be-api/studies`;

const token = localStorage.getItem("kakao-token");

export async function calendarSelectAllApi() {
  try {
    const response = await fetch(`${BASE_URL}/1/schedules`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    console.log("response : ", response);
    const data = await response.json();
    console.log("data  : ", data);

    return data;
  } catch (error: any) {
    console.log(error);
  }
}

// 일정 등록 http://localhost:8080/studies/1/schdules
export async function calendarCreateApi(data: object) {
  try {
    console.log("post data", data);
    await axios.post(`${BASE_URL}/1/schdules`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    // 에러 발생 시
    console.log(error);
  }
}
//
