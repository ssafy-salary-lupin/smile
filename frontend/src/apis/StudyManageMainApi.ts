import axios from "axios";

const BASE_URL = `https://i8b205.p.ssafy.io/be-api/studies`;
// const BASE_URL = `/be-api/studies`;

const token = localStorage.getItem("kakao-token");

// 스터디 정보 조회 /studies/1/home
export async function StudyInfoSelectApi() {
  try {
    const response = await fetch(`${BASE_URL}/1/home`, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYxNzQ5NDYsImV4cCI6MTY3NjI2MTM0Nn0.SfVLAGLVlq0SOodUcnH8Xk2G3iFRnlLb6zNKk3PXGRJzYCWNUEcCLYYc5NOJ560OimORskELTfJK79suE6MasQ`,
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
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYxNzQ5NDYsImV4cCI6MTY3NjI2MTM0Nn0.SfVLAGLVlq0SOodUcnH8Xk2G3iFRnlLb6zNKk3PXGRJzYCWNUEcCLYYc5NOJ560OimORskELTfJK79suE6MasQ`,
        Accept: "application/json",
      },
    });
    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log(error);
  }
}

// 규칙 등록하기 /studies/{study-id}/schedules
export async function ruleCreateApi(data: any) {
  try {
    await axios.patch(`${BASE_URL}/1`, JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYxNzQ5NDYsImV4cCI6MTY3NjI2MTM0Nn0.SfVLAGLVlq0SOodUcnH8Xk2G3iFRnlLb6zNKk3PXGRJzYCWNUEcCLYYc5NOJ560OimORskELTfJK79suE6MasQ`,
        "Content-Type": `application/json`,
      },
    });
  } catch (error: any) {
    // 에러 발생 시
    console.log(error);
  }
}

// 스터디 정보 조회 /studies/1/home
export async function StudySelectApi() {
  try {
    const response = await fetch(`${BASE_URL}/1`, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYxNzQ5NDYsImV4cCI6MTY3NjI2MTM0Nn0.SfVLAGLVlq0SOodUcnH8Xk2G3iFRnlLb6zNKk3PXGRJzYCWNUEcCLYYc5NOJ560OimORskELTfJK79suE6MasQ`,
        Accept: "application/json",
      },
    });
    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log(error);
  }
}
