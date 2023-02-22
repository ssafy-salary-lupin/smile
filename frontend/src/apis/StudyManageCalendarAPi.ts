import axios from "axios";
<<<<<<< HEAD

const BASE_URL = `https://i8b205.p.ssafy.io/be-api/studies`;

export async function calendarSelectAllApi() {
  try {
    console.log("Get 실행");
    const response = await fetch(`${BASE_URL}/1/schedules`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzU3MzQ0MzcsImV4cCI6MTY3NTczODAzN30.NcRcaVjomF3AQAzimvDN3wf4XeMrlIfPnnIyy6lO2bKoGP-RZWqVqEmXbkIT29U5WNSufEOrrufwhvDhx2jv9w",
=======
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
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
        Accept: "application/json",
      },
    });

<<<<<<< HEAD
    console.log("response : ", response);
    const data = await response.json();
    console.log("data  : ", data);
=======
    const data = await response.json();
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3

    return data;
  } catch (error: any) {
    console.log(error);
  }
}

<<<<<<< HEAD
// export async function calendarSelectAllApi() {
//   try {
//     console.log("Get 실행");
//     // const result = await axios.get(`${BASE_URL}/1/schdules`); => axios 반환타입 어카냐...
//     const response = await fetch(`${BASE_URL}/1/schedules`, {
//       headers: {
//         Authorization:
//           "eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzU2OTM5MjYsImV4cCI6MTY3NTY5NzUyNn0.85cHzBJlpeBoBsjYd_4mPP6dfYrabyZWIuXTi-SgAqvFP_lAOOpiqTfu9MxUMKzh3i5wSsFpeNUZouLjTYEbRA",
//         Accept: "application / json",
//       },
//       method: "GET",
//     });

//     console.log("response : ", response);
//     const data = await response.json();
//     console.log("data  : ", data);
//     // console.log("result : ", result);
//     // console.log("result Type : ", typeof result);

//     // const result2 = [
//     //   {
//     //     id: "1", //일정 식별자
//     //     startTime: "2023-02-20 14:00", //일정 시작 일자
//     //     endTime: "2023-02-28 15:00", //일정 마감일자
//     //     title: "현대오토에버 공채", //일정 제목
//     //     description: "현대오토에버 서류",
//     //     url: "asdf", //일정 url
//     //     type: {
//     //       id: "1",
//     //       name: "서류지원", //유형이름
//     //     },
//     //   },
//     //   {
//     //     id: "1", //일정 식별자
//     //     startTime: "2023-02-01 14:00", //일정 시작 일자
//     //     endTime: "2023-02-04 15:00", //일정 마감일자
//     //     title: "현대오토에버 공채", //일정 제목
//     //     description: "현대오토에버 서류",
//     //     url: "asdf", //일정 url
//     //     type: {
//     //       id: "1",
//     //       name: "서류지원", //유형이름
//     //     },
//     //   },
//     //   {
//     //     id: "1", //일정 식별자
//     //     startTime: "2023-02-07 14:00", //일정 시작 일자
//     //     endTime: "2023-02-09 15:00", //일정 마감일자
//     //     title: "현대오토에버 공채", //일정 제목
//     //     description: "현대오토에버 서류",
//     //     url: "asdf", //일정 url
//     //     type: {
//     //       id: "1",
//     //       name: "서류지원", //유형이름
//     //     },
//     //   },
//     // ];

//     return data;
//   } catch (error: any) {
//     console.log(error);
//   }
// }

// 일정 단건 조회 http://localhost:8080/studies/1/schedules/1

// 일정 등록 http://localhost:8080/studies/1/schdules
export async function calendarCreateApi(data: object) {
  try {
    console.log("post data", data);
    // await axios.post(`${BASE_URL}/1/schdules`, data);
=======
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
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
  } catch (error: any) {
    // 에러 발생 시
    console.log(error);
  }
}
<<<<<<< HEAD
//
=======
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
