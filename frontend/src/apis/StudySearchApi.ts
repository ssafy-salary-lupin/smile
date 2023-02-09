import axios from "axios";

// const BASE_URL = `https://i8b205.p.ssafy.io/be-api/studies`;
const BASE_URL = `/be-api/studies`;

export async function StudySearchAll() {
  try {
    console.log("API 시작");
    const res = await axios.get(`${BASE_URL}`);
    console.log("RES: ", res);
    return res;
  } catch (error: any) {
    // 에러 발생 시
    console.log(error);
  }
}
