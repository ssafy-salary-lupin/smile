import axios from "axios";
import { IRegistData } from "components/study-manage/ModalMeetingCreate";

const BASE_URL = `https://i8b205.p.ssafy.io/be-api/studies`;
// const BASE_URL = `/be-api/studies`;

const token = localStorage.getItem("kakao-token");

// 면접 등록
export async function MeetingCreateApi(data: IRegistData) {
  console.log("post 실행");
  console.log("data : ", data);
  try {
    return await axios.post(`${BASE_URL}/1/meetings`, JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYwMDIwOTcsImV4cCI6MTY3NjA4ODQ5N30.NAXgu10IwfXk9rxi5E50MkBBhlLyYBHer35FTqrR7PXAhVVOd3EjsrcsHC8CB5VtOMrI00jygr6PMG8sF0gWOQ`,
        "Content-Type": `application/json`,
      },
    });
  } catch (error: any) {
    // 에러 발생 시
    return error;
  }
}

// 생성된 면접 조회
export async function MeetingSelectApi() {
  try {
    const response = await fetch(`${BASE_URL}/1/meetings`, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYwMDIwOTcsImV4cCI6MTY3NjA4ODQ5N30.NAXgu10IwfXk9rxi5E50MkBBhlLyYBHer35FTqrR7PXAhVVOd3EjsrcsHC8CB5VtOMrI00jygr6PMG8sF0gWOQ`,
        Accept: "application/json",
      },
    });
    const data = await response.json();
    console.log("study 정보 : ", data);

    return data;
  } catch (error: any) {
    console.log(error);
  }
}
