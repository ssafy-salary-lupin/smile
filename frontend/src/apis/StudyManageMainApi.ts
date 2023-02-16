import axios from "axios";
//
const BASE_URL = `https://i8b205.p.ssafy.io/be-api/studies`;
// const BASE_URL = `/be-api/studies`;

// 사용자 token값..
const token = localStorage.getItem("kakao-token");

// 스터디 정보 조회 /studies/1/home
export async function StudyInfoSelectApi(studyId: string) {
  try {
    const response = await fetch(`${BASE_URL}/${studyId}/home`, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYzMDEyNDYsImV4cCI6MTY3NjM4NzY0Nn0.ZysqSzrc7kyFB37Lh7Xy5wBFcngkv68arQlFHULGCAoPoN3mmrasVwkh7voaWZqor_e5lLLFIhqPWu7p-pIO0A`,
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
export async function DdaySelectApi(studyId: string) {
  try {
    const response = await fetch(`${BASE_URL}/${studyId}/home/d-day`, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYzMDEyNDYsImV4cCI6MTY3NjM4NzY0Nn0.ZysqSzrc7kyFB37Lh7Xy5wBFcngkv68arQlFHULGCAoPoN3mmrasVwkh7voaWZqor_e5lLLFIhqPWu7p-pIO0A`,
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
export async function ruleCreateApi(data: any, studyId: string) {
  try {
    await axios.patch(`${BASE_URL}/${studyId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYzMDEyNDYsImV4cCI6MTY3NjM4NzY0Nn0.ZysqSzrc7kyFB37Lh7Xy5wBFcngkv68arQlFHULGCAoPoN3mmrasVwkh7voaWZqor_e5lLLFIhqPWu7p-pIO0A`,
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error: any) {
    // 에러 발생 시
    console.log(error);
  }
}

// 스터디 정보 조회 /studies/1/home
export async function StudySelectApi(studyId: string) {
  try {
    const response = await fetch(`${BASE_URL}/${studyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYzMDEyNDYsImV4cCI6MTY3NjM4NzY0Nn0.ZysqSzrc7kyFB37Lh7Xy5wBFcngkv68arQlFHULGCAoPoN3mmrasVwkh7voaWZqor_e5lLLFIhqPWu7p-pIO0A`,
        Accept: "application/json",
      },
    });
    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log(error);
  }
}

// 스터디 유저 조회
export async function StudyUserApi(studyId: string) {
  try {
    const response = await fetch(`${BASE_URL}/${studyId}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYzMDEyNDYsImV4cCI6MTY3NjM4NzY0Nn0.ZysqSzrc7kyFB37Lh7Xy5wBFcngkv68arQlFHULGCAoPoN3mmrasVwkh7voaWZqor_e5lLLFIhqPWu7p-pIO0A`,
        Accept: "application/json",
      },
    });
    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log(error);
  }
}

// 채팅 정보 조회
export async function ChatSelectAllApi(studyId: string) {
  try {
    const response = await fetch(`${BASE_URL}/${studyId}/chats`, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYzMDEyNDYsImV4cCI6MTY3NjM4NzY0Nn0.ZysqSzrc7kyFB37Lh7Xy5wBFcngkv68arQlFHULGCAoPoN3mmrasVwkh7voaWZqor_e5lLLFIhqPWu7p-pIO0A`,
        Accept: "application/json",
      },
    });
    const data = await response.json();
    console.log("data : ", data);
    return data;
  } catch (error: any) {
    console.log(error);
  }
}
