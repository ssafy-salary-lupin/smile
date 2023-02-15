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

// 스터디 생성
export async function CreateStudyApi(formData: any) {
  try {
    console.log("formdata : ", formData);
    await axios.post(`${BASE_URL}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYzNzYwMzMsImV4cCI6MTY3NjQ2MjQzM30.a4g2trHjGIuz4AJcZui4RWfOOfXnhQ3VtxULyo85cIAQ1gAY3YeMcjJ1ks6yZhtOU2yfbScRR1bK6qugkYZdFw`,
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error: any) {
    console.log(error);
  }
}
