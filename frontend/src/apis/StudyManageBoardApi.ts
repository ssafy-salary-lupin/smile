import axios from "axios";

const BASE_URL = `https://i8b205.p.ssafy.io/be-api/studies`;

interface ICreatedBoard {
  data: {
    title: string; // 게시글 제목
    content: string; // 게시글 내용
    typeId: string; // 게시글 유형 식별자
  };
  files: [];
}

// 게시글 목록 불러오기
export async function boardListSelectAllApi(page: number, size: number) {
  try {
    console.log("Get 실행");
    const response = await fetch(
      `${BASE_URL}/1/boards?page=${page}&size=${size}`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzU3MzI1ODUsImV4cCI6MTY3NTczNjE4NX0.XgNWqDPxM_UQbgaTrXhw0Yd4HaQMuKt7EZP075Lev1ldaEl77quSo66F_fQf7lW43jRndyI3ekH5ntn3qtzjxA",
          Accept: "application/json",
        },
      },
    );

    console.log("response : ", response);
    const data = await response.json();
    console.log("data  : ", data);

    return data;
  } catch (error: any) {
    console.log(error);
  }
}

// 게시글 생성
export async function boardCreateApi(data: ICreatedBoard) {
  try {
    console.log("POST 실행");
    const response = await axios.post(`${BASE_URL}/1/boards`, data, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzU3MzI1ODUsImV4cCI6MTY3NTczNjE4NX0.XgNWqDPxM_UQbgaTrXhw0Yd4HaQMuKt7EZP075Lev1ldaEl77quSo66F_fQf7lW43jRndyI3ekH5ntn3qtzjxA",
        Accept: "multipart/form-data",
      },
    });
  } catch (error) {
    console.log(error);
  }
}
