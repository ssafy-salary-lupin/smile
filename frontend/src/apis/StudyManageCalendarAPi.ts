import axios from "axios";

const BASE_URL = `http://localhost:8080/studies`;

// 일정 전체 조회 http://localhost:8080/studies/1/schedules
/*{
    "id" : 1, //일정 식별자
    "startTime" : 2023.01.20 14:00 ,   //일정 시작 일자
    "endTime" : 2023.01.30 15:00,      //일정 마감일자
    "title" : "현대오토에버 공채",        //일정 제목
    "description": "현대오토에버 서류",
    "url" : "asdf", //일정 url
    "type" : {
        "id" : 1,
        "name" : "서류지원",//유형이름
    }
},*/
export async function calendarSelectAllApi() {
  try {
    // const result = await axios.get(`${BASE_URL}/1/schdules`);
    const result = [
      {
        id: "1", //일정 식별자
        startTime: "2023.01.20 14:00", //일정 시작 일자
        endTime: "2023.01.30 15:00", //일정 마감일자
        title: "현대오토에버 공채", //일정 제목
        description: "현대오토에버 서류",
        url: "asdf", //일정 url
        type: {
          id: "1",
          name: "서류지원", //유형이름
        },
      },
    ];
    console.log("받은 데이터 ", result);
    return result;
  } catch (error: any) {
    console.log(error);
  }
}

// 일정 단건 조회 http://localhost:8080/studies/1/schedules/1

// 일정 등록 http://localhost:8080/studies/1/schdules
export async function calendarCreateApi(data: object) {
  try {
    await axios.post(`${BASE_URL}/1/schdules`, data);
  } catch (error: any) {
    // 에러 발생 시
    console.log(error);
  }
}
