import axios from "axios";

const BASE_URL = `https://i8b205.p.ssafy.io/be-api/studies`;

export async function StudySearcAll() {
  try {
    const res = await axios.get(`${BASE_URL}`);
    console.log(res);
    return res;
  } catch (error: any) {
    // 에러 발생 시
    console.log(error);
  }
}
