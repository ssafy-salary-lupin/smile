import axios from "axios";

const BASE_URL = `https://i8b205.p.ssafy.io/be-api/users`;

// 내 스터디 목록 불러오기
export async function MyStudyAllApi(userId: number) {
  try {
    console.log("Get 실행");
    console.log(`${BASE_URL}/${userId}/studies`);
    const data = await axios.get(`${BASE_URL}/${userId}/studies`);

    console.log("data : ", data);
    // const data = await response.json();
    // console.log("data  : ", data);

    return data;
  } catch (error: any) {
    console.log(error);
  }
}
