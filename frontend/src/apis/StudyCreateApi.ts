import axios from "axios";

const BASE_URL = `https://i8b205.p.ssafy.io/be-api/studies`;
// const BASE_URL = `/be-api/studies`;

const token = localStorage.getItem("kakao-token");

// 스터디 타입 조회
export async function studyTypeApi() {
  try {
    const response = await fetch(`${BASE_URL}/types`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log(error);
  }
}

// 스터디 생성
export async function CreateStudyApi(formData: any) {
  console.log("token : ", token);
  try {
    console.log("formdata : ", formData);
    await axios.post(`${BASE_URL}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error: any) {
    console.log(error);
  }
}
