import axios from "axios";
import { IRegistData } from "components/study-manage/ModalCalendarRegist";

const BASE_URL = `https://i8b205.p.ssafy.io/be-api/studies`;

export async function calendarSelectAllApi() {
  const token = localStorage.getItem("kakao-token");
  try {
    console.log("token값 : ", token);
    const response = await fetch(`${BASE_URL}/1/schedules`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log(error);
  }
}

// 일정 등록 http://localhost:8080/studies/1/schdules
export async function calendarCreateApi(data: IRegistData) {
  console.log("일정 POST 실행");
  const token = localStorage.getItem("kakao-token");
  try {
    await axios.post(`${BASE_URL}/1/schedules`, JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": `application/json`,
      },
    });
  } catch (error: any) {
    // 에러 발생 시
    console.log(error);
  }
}
//
