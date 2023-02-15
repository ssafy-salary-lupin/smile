import axios from "axios";
const BASE_URL = `https://i8b205.p.ssafy.io/be-api`;
const token = localStorage.getItem("kakao-token");

const api = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-type": "application/json; charset=UTF-8",
    accept: "application/json,",
  },
});

export const InfoApi = {
  api: api,
};
