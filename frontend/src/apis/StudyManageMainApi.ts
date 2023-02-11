import axios from "axios";

// const BASE_URL = `https://i8b205.p.ssafy.io/be-api/studies`;
const BASE_URL = `/be-api/studies`;

const token = localStorage.getItem("kakao-token");

// 스터디 정보 조회 /studies/1/home
export async function StudyInfoSelectApi() {
  try {
    const response = await fetch(`${BASE_URL}/1/home`, {
      headers: {
        // Authorization: `Bearer ${token}`,
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYwODg0NjMsImV4cCI6MTY3NjE3NDg2M30.1Pm6qt_on0IEM9NAoa55co1vixXY67gyVo4plubt4T5aXHvNEu_P3LPTsF5LNWIelYBXowIBPttiRR2Y0wDJmw`,
        Accept: "application/json",
      },
    });
    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log(error);
  }
}

// 디데이 정보 조회
// /studies/{study_id}/home/d-day
export async function DdaySelectApi() {
  try {
    const response = await fetch(`${BASE_URL}/1/home/d-day`, {
      headers: {
        // Authorization: `Bearer ${token}`,
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYwODg0NjMsImV4cCI6MTY3NjE3NDg2M30.1Pm6qt_on0IEM9NAoa55co1vixXY67gyVo4plubt4T5aXHvNEu_P3LPTsF5LNWIelYBXowIBPttiRR2Y0wDJmw`,
        Accept: "application/json",
      },
    });
    const data = await response.json();
    console.log("dday 정보 : ", data);

    return data;
  } catch (error: any) {
    console.log(error);
  }
}

// 일정 단건 조회
export async function scheduleSelectApi(scheduleId: number) {
  try {
    const response = await fetch(`${BASE_URL}/1/schedules/${scheduleId}`, {
      headers: {
        // Authorization: `Bearer ${token}`,
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYwODg0NjMsImV4cCI6MTY3NjE3NDg2M30.1Pm6qt_on0IEM9NAoa55co1vixXY67gyVo4plubt4T5aXHvNEu_P3LPTsF5LNWIelYBXowIBPttiRR2Y0wDJmw`,
        Accept: "application/json",
      },
    });
    const data = await response.json();
    console.log("일정 정보 : ", data);

    return data;
  } catch (error: any) {
    console.log(error);
  }
}
