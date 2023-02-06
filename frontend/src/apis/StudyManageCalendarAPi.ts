import axios from "axios";

const BASE_URL = `https://i8b205.p.ssafy.io/be-api/studies`;

// recoil 추가..
// 일정 전체 조회 http://localhost:8080/studies/1/schedules
// eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzU0MDk1NTQsImV4cCI6MTY3NTQxMzE1NH0.MLqPPEHlqa1zfXTmhrzcosQwWrCe7c1oPfTV2gLGRgSUY-GyYslNBg5gByvwr5garTVRVXcGv6dV53MwaqSA0g

export async function calendarSelectAllApi() {
  try {
    console.log("Get 실행");
    // const result = await axios.get(`${BASE_URL}/1/schdules`); => axios 반환타입 어카냐...
    const response = await fetch(`${BASE_URL}/1/schedules`, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzU2OTM5MjYsImV4cCI6MTY3NTY5NzUyNn0.85cHzBJlpeBoBsjYd_4mPP6dfYrabyZWIuXTi-SgAqvFP_lAOOpiqTfu9MxUMKzh3i5wSsFpeNUZouLjTYEbRA",
        Accept: "application / json",
      },
      method: "GET",
    });

    console.log("response : ", response);
    const data = await response.json();
    console.log("data  : ", data);
    // console.log("result : ", result);
    // console.log("result Type : ", typeof result);

    // const result2 = [
    //   {
    //     id: "1", //일정 식별자
    //     startTime: "2023-02-20 14:00", //일정 시작 일자
    //     endTime: "2023-02-28 15:00", //일정 마감일자
    //     title: "현대오토에버 공채", //일정 제목
    //     description: "현대오토에버 서류",
    //     url: "asdf", //일정 url
    //     type: {
    //       id: "1",
    //       name: "서류지원", //유형이름
    //     },
    //   },
    //   {
    //     id: "1", //일정 식별자
    //     startTime: "2023-02-01 14:00", //일정 시작 일자
    //     endTime: "2023-02-04 15:00", //일정 마감일자
    //     title: "현대오토에버 공채", //일정 제목
    //     description: "현대오토에버 서류",
    //     url: "asdf", //일정 url
    //     type: {
    //       id: "1",
    //       name: "서류지원", //유형이름
    //     },
    //   },
    //   {
    //     id: "1", //일정 식별자
    //     startTime: "2023-02-07 14:00", //일정 시작 일자
    //     endTime: "2023-02-09 15:00", //일정 마감일자
    //     title: "현대오토에버 공채", //일정 제목
    //     description: "현대오토에버 서류",
    //     url: "asdf", //일정 url
    //     type: {
    //       id: "1",
    //       name: "서류지원", //유형이름
    //     },
    //   },
    // ];

    return data;
  } catch (error: any) {
    console.log(error);
  }
}

// 일정 단건 조회 http://localhost:8080/studies/1/schedules/1

// 일정 등록 http://localhost:8080/studies/1/schdules
export async function calendarCreateApi(data: object) {
  try {
    console.log("post data", data);
    // await axios.post(`${BASE_URL}/1/schdules`, data);
  } catch (error: any) {
    // 에러 발생 시
    console.log(error);
  }
}
//
