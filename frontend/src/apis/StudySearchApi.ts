import axios from "axios";

const BASE_URL = `https://i8b205.p.ssafy.io/be-api/studies`;
// const BASE_URL = `/be-api`;
const token = localStorage.getItem("kakao-token");

const api = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-type": "application/json; charset=UTF-8",
    accept: "application/json,",
  },
});

export const StudySearchAll = {
  get: () => api.get("/studies"),
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
