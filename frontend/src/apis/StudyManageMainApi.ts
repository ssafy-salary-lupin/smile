import axios from "axios";

const BASE_URL = `https://i8b205.p.ssafy.io/be-api/studies`;
// const BASE_URL = `/be-api/studies`;

const token = localStorage.getItem("kakao-token");

// 스터디 정보 조회 /studies/1
export async function StudyInfoSelectApi() {
  try {
    const response = await fetch(`${BASE_URL}/1`, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzU5MjY1ODgsImV4cCI6MTY3NjAxMjk4OH0.fIlrZ6tLFYldo0_YLvJN60Yq4RozALJeKT_NKHEMcDVK9nMsvy-Y8PtW8IcE8veBVhmjG6E2tph0abe4_9A3Tw`,
        Accept: "application/json",
      },
    });
    const data = await response.json();
    console.log("study 정보 : ", data);

    return data;
  } catch (error: any) {
    console.log(error);
  }
}

// 가입 멤버 조회 /studies/1/users
export async function StudyUserSelectApi() {
  try {
    const response = await fetch(`${BASE_URL}/1/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzU5MjY1ODgsImV4cCI6MTY3NjAxMjk4OH0.fIlrZ6tLFYldo0_YLvJN60Yq4RozALJeKT_NKHEMcDVK9nMsvy-Y8PtW8IcE8veBVhmjG6E2tph0abe4_9A3Tw`,
        Accept: "application/json",
      },
    });
    const data = await response.json();
    console.log("가입 멤버 : ", data);

    return data;
  } catch (error: any) {
    console.log(error);
  }
}
