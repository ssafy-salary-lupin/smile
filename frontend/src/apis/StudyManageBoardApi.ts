import axios from "axios";

const BASE_URL = `https://i8b205.p.ssafy.io/be-api/studies`;
// const BASE_URL = `/be-api/studies`;

const token = localStorage.getItem("kakao-token");

// 게시판 목록 조회
export async function boardListSelectAllApi(page: number, size: number) {
  try {
    const response = await fetch(
      `${BASE_URL}/1/boards?page=${page}&size=${size}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzU5MTUwMjUsImV4cCI6MTY3NjAwMTQyNX0.S9Oh0nZbIuiVembIlMbHnOkYddjwDCk-O91uij5fmCr1YtxbcZSAk-9a10ODoozjzk2-RrCzY9K7j7HHUkdMlA`,
          Accept: "application/json",
        },
      },
    );

    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log(error);
  }
}

// 게시판 상세 조회
export async function boardSelectApi(boardId: string) {
  try {
    const response = await fetch(`${BASE_URL}/1/boards/${boardId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzU5MTUwMjUsImV4cCI6MTY3NjAwMTQyNX0.S9Oh0nZbIuiVembIlMbHnOkYddjwDCk-O91uij5fmCr1YtxbcZSAk-9a10ODoozjzk2-RrCzY9K7j7HHUkdMlA`,
        Accept: "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error);
  }
}

// 게시글 수정

// 게시글 입력
