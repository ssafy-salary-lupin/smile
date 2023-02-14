import axios from "axios";
import { IRegistData } from "components/study-manage/ModalMeetingCreate";

// const BASE_URL = `https://i8b205.p.ssafy.io/be-api/studies`;
const BASE_URL = `/be-api/studies`;

const token = localStorage.getItem("kakao-token");

// 면접 등록
export async function MeetingCreateApi(data: IRegistData, studyId: string) {
  try {
    return await axios.post(
      `${BASE_URL}/${studyId}/meetings`,
      JSON.stringify(data),
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYzNzYwMzMsImV4cCI6MTY3NjQ2MjQzM30.a4g2trHjGIuz4AJcZui4RWfOOfXnhQ3VtxULyo85cIAQ1gAY3YeMcjJ1ks6yZhtOU2yfbScRR1bK6qugkYZdFw`,
          "Content-Type": `application/json`,
        },
      },
    );
  } catch (error: any) {
    // 에러 발생 시
    return error;
  }
}

// 생성된 면접 조회
export async function MeetingSelectAllApi(studyId: string) {
  try {
    const response = await fetch(`${BASE_URL}/${studyId}/meetings`, {
      headers: {
        // Authorization: `Bearer ${token}`,
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYzNzYwMzMsImV4cCI6MTY3NjQ2MjQzM30.a4g2trHjGIuz4AJcZui4RWfOOfXnhQ3VtxULyo85cIAQ1gAY3YeMcjJ1ks6yZhtOU2yfbScRR1bK6qugkYZdFw`,
        Accept: "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error: any) {
    console.log(error);
  }
}
