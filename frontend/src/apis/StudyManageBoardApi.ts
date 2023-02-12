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
          // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYxODMwNzAsImV4cCI6MTY3NjI2OTQ3MH0.uEJBzNc0KOFx1iMbGapjn60vC5UBwcIULQBSOUJ2q6aWIJryr0bOJAY-t1ISh4QN-i7yq9i6IenzNJNxkunyqw`,
          Accept: "application/json",
        },
      },
    );

    const data = await response.json();

    console.log("게시글 목록 : ", data);

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
        // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYxODMwNzAsImV4cCI6MTY3NjI2OTQ3MH0.uEJBzNc0KOFx1iMbGapjn60vC5UBwcIULQBSOUJ2q6aWIJryr0bOJAY-t1ISh4QN-i7yq9i6IenzNJNxkunyqw`,
        Accept: "application/json",
      },
    });

    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log(error);
  }
}

// 게시글 유형 조회 /studies/boards/types
export async function boardTypeSelectApi() {
  try {
    const response = await fetch(`${BASE_URL}/boards/types`, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYxODMwNzAsImV4cCI6MTY3NjI2OTQ3MH0.uEJBzNc0KOFx1iMbGapjn60vC5UBwcIULQBSOUJ2q6aWIJryr0bOJAY-t1ISh4QN-i7yq9i6IenzNJNxkunyqw`,
        Accept: "application/json",
      },
    });

    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log(error);
  }
}

// 게시글 입력
export async function boardeInsertApi(data: any) {
  try {
    await axios.post(`${BASE_URL}/1/boards`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("kakao-token")}`,
        // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYxODMwNzAsImV4cCI6MTY3NjI2OTQ3MH0.uEJBzNc0KOFx1iMbGapjn60vC5UBwcIULQBSOUJ2q6aWIJryr0bOJAY-t1ISh4QN-i7yq9i6IenzNJNxkunyqw`,
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.log(error);
  }
}

// 게시글 삭제
export async function deleteScheduleApi(boardId: string) {
  try {
    await axios.delete(`${BASE_URL}/1/boards/${boardId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYxODMwNzAsImV4cCI6MTY3NjI2OTQ3MH0.uEJBzNc0KOFx1iMbGapjn60vC5UBwcIULQBSOUJ2q6aWIJryr0bOJAY-t1ISh4QN-i7yq9i6IenzNJNxkunyqw`,
      },
    });
  } catch (error: any) {
    console.log(error);
  }
}

// 댓글 작성
export async function writeCommentApi(data: any, boardId: string) {
  try {
    await axios.post(
      `${BASE_URL}/1/boards/${boardId}/comments`,
      JSON.stringify(data),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYxODMwNzAsImV4cCI6MTY3NjI2OTQ3MH0.uEJBzNc0KOFx1iMbGapjn60vC5UBwcIULQBSOUJ2q6aWIJryr0bOJAY-t1ISh4QN-i7yq9i6IenzNJNxkunyqw`,
          "Content-Type": `application/json`,
        },
      },
    );
  } catch (error) {
    console.log(error);
  }
}
