import axios from "axios";

const BASE_URL = `https://i8b205.p.ssafy.io/be-api/studies`;
//
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
