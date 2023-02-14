import axios from "axios";

const BASE_URL = `https://i8b205.p.ssafy.io/be-api/studies`;
const token = localStorage.getItem("kakao-token");
const formData = new FormData();

// // 스터디에 속한 유저 정보 가져오기
export async function StudyUserApi() {
  try {
    const response = await fetch(`${BASE_URL}/1/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error: any) {
    console.log(error);
  }
}
// // 위임
export async function MandateApi() {
  try {
    const response = await axios.patch(`${BASE_URL}/1/users/3`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    const data = await response;
    console.log("Mandate");
    console.log(data);
    return data;
  } catch (error: any) {
    console.log(error);
  }
}

// // 강퇴
export async function UserDropApi() {
  try {
    const response = await axios.delete(`${BASE_URL}/1/users/1`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    const data = await response;
    console.log("Drop");
    console.log(data);
    return data;
  } catch (error: any) {
    console.log(error);
  }
}

// // 스터디 종료
export async function StudyEndApi() {
  try {
    const response = await axios.patch(`${BASE_URL}/1/close`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    const data = await response;
    console.log("End");
    console.log(data);
    return data;
  } catch (error: any) {
    console.log(error);
  }
}

// // 스터디 모집
export async function StudyRecruitmentApi() {
  try {
    console.log("token", token);
    console.log("???");
    const response = await axios.patch(`${BASE_URL}/1/recruit`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    const data = await response;
    console.log("recruit");
    console.log(data);
    return data;
  } catch (error: any) {
    console.log(error);
  }
}

// // 스터디 마감
export async function StudyReDeadlineApi() {
  try {
    const response = await axios.patch(`${BASE_URL}/1/deadline`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    const data = await response;
    console.log("deadline");
    console.log(data);
    return data;
  } catch (error: any) {
    console.log(error);
  }
}
