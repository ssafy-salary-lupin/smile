import axios from "axios";
import { IRegistData } from "components/study-manage/ModalCalendarRegist";

const BASE_URL = `https://i8b205.p.ssafy.io/be-api/studies`;
// const BASE_URL = `/be-api/studies`;

const token = localStorage.getItem("kakao-token");

// 일정 조회
export async function calendarSelectAllApi(studyId: string) {
  try {
    const response = await fetch(`${BASE_URL}/${studyId}/schedules`, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYzMDEyNDYsImV4cCI6MTY3NjM4NzY0Nn0.ZysqSzrc7kyFB37Lh7Xy5wBFcngkv68arQlFHULGCAoPoN3mmrasVwkh7voaWZqor_e5lLLFIhqPWu7p-pIO0A`,
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
export async function calendarCreateApi(data: IRegistData, studyId: string) {
  console.log("등록 data : ", data);
  try {
    await axios.post(`${BASE_URL}/${studyId}/schedules`, JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYzMDEyNDYsImV4cCI6MTY3NjM4NzY0Nn0.ZysqSzrc7kyFB37Lh7Xy5wBFcngkv68arQlFHULGCAoPoN3mmrasVwkh7voaWZqor_e5lLLFIhqPWu7p-pIO0A`,
        "Content-Type": `application/json`,
      },
    });
  } catch (error: any) {
    // 에러 발생 시
    console.log(error);
  }
}

// 회의 조회
export async function meetingSelectAllApi(studyId: string) {
  try {
    const response = await fetch(`${BASE_URL}/${studyId}/meetings`, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYzMDEyNDYsImV4cCI6MTY3NjM4NzY0Nn0.ZysqSzrc7kyFB37Lh7Xy5wBFcngkv68arQlFHULGCAoPoN3mmrasVwkh7voaWZqor_e5lLLFIhqPWu7p-pIO0A`,
        Accept: "application/json",
      },
    });

    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log(error);
  }
}

// 일정 삭제
export async function deleteScheduleApi(scheduleId: number, studyId: string) {
  try {
    await axios.delete(`${BASE_URL}/${studyId}/schedules/${scheduleId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYzMDEyNDYsImV4cCI6MTY3NjM4NzY0Nn0.ZysqSzrc7kyFB37Lh7Xy5wBFcngkv68arQlFHULGCAoPoN3mmrasVwkh7voaWZqor_e5lLLFIhqPWu7p-pIO0A`,
      },
    });
  } catch (error: any) {
    console.log(error);
  }
}

// 일정 단건 조회
export async function scheduleSelectApi(scheduleId: number, studyId: string) {
  try {
    const response = await fetch(
      `${BASE_URL}/${studyId}/schedules/${scheduleId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYzMDEyNDYsImV4cCI6MTY3NjM4NzY0Nn0.ZysqSzrc7kyFB37Lh7Xy5wBFcngkv68arQlFHULGCAoPoN3mmrasVwkh7voaWZqor_e5lLLFIhqPWu7p-pIO0A`,
          Accept: "application/json",
        },
      },
    );
    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log(error);
  }
}

// 일정 수정하기 /studies/1/scedules/1
export async function scheduleUpdateApi(
  data: any,
  scheduleId: number,
  studyId: string,
) {
  try {
    await axios.patch(
      `${BASE_URL}/${studyId}/schedules/${scheduleId}`,
      JSON.stringify(data),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYzMDEyNDYsImV4cCI6MTY3NjM4NzY0Nn0.ZysqSzrc7kyFB37Lh7Xy5wBFcngkv68arQlFHULGCAoPoN3mmrasVwkh7voaWZqor_e5lLLFIhqPWu7p-pIO0A`,
          "Content-Type": `application/json`,
        },
      },
    );
  } catch (error: any) {
    // 에러 발생 시
    console.log(error);
  }
}
