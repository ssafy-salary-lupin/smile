import axios from "axios";

const BASE_URL = `https://i8b205.p.ssafy.io/be-api/studies`;

const token = localStorage.getItem("kakao-token");

export async function boardListSelectAllApi(page: number, size: number) {
  try {
    const response = await fetch(
      `${BASE_URL}/1/boards?page=${page}&size=${size}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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
