import axios from "axios";

// const BASE_URL = `https://i8b205.p.ssafy.io/be-api`;
const BASE_URL = `/be-api`;

// const token = localStorage.getItem("kakao-token");
const token =
  "eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoib3RoNTQ0N0BuYXZlci5jb20iLCJ1c2VySWQiOjYsImlzcyI6Imlzc3VlciIsImlhdCI6MTY3NjQ2NTQxNCwiZXhwIjoxNjc2NTUxODE0fQ.bOovDIT89-5SwwVcdiE4jM4-0LWetRNrPYR9V2NYdUKMFHCZIE05tkxpMOgilZQ5BDwpVpq0b9Cm7LSZe7-Sgw";

const api = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-type": "application/json; charset=UTF-8",
    accept: "application/json,",
  },
});

export const PostItInfo = {
  api: api,
};
