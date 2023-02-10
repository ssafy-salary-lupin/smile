import axios from "axios";

const BASE_URL = `https://i8b2ies`;
// const BASE_URL = `/be-api`;05.p.ssafy.io/be-api/stud
const token = localStorage.getItem("kakao-token");

const api = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-type": "application/json; charset=UTF-8",
    accept: "application/json,",
  },
});
console.log(1);
export const StudySearchAll = () => {
  const res = api.get("/studies");
  console.log(res);
  return res;
};

// export async function StudySearchAll() {
//   try {
//     console.log("API 시작");
//     const res = await api.get("/studies");
//     const data = res.data.result;
//     console.log("RES: ", data);
//     return data;
//   } catch (error) {
//     // 에러 발생 시
//     console.log(error);
//     return error;
//   }
// }
