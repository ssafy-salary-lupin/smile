import axios from "axios";

const BASE_URL = `https://i8b205.p.ssafy.io/be-api/studies`;

export async function StudySearcAll() {
  try {
    return await axios.get(`${BASE_URL}`);
  } catch (error: any) {
    // 에러 발생 시
    console.log(error);
  }
}
