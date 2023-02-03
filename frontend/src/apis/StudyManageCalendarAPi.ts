import axios from "axios";

const BASE_URL = `http://localhost:8080/studies`;

// recoil 추가..
// 일정 전체 조회 http://localhost:8080/studies/1/schedules
export async function calendarSelectAllApi() {
  try {
    console.log("Get 실행");
    // const result = await axios.get(`${BASE_URL}/1/schdules`); => axios 반환타입 어카냐...
    const result = await fetch(`${BASE_URL}/1/schdules`).then((response) =>
      response.json(),
    );
    console.log("result Type : ", typeof result);
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
    return result;
  } catch (error: any) {
    console.log(error);
  }
}

// 일정 단건 조회 http://localhost:8080/studies/1/schedules/1

// 일정 등록 http://localhost:8080/studies/1/schdules
export async function calendarCreateApi(data: object) {
  try {
    console.log("post data", data);
    await axios.post(`${BASE_URL}/1/schdules`, data);
  } catch (error: any) {
    // 에러 발생 시
    console.log(error);
  }
}
