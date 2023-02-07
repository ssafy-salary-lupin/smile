import axios from "axios";

const BASE_URL = `https://i8b205.p.ssafy.io/be-api/studies`;

export async function boardListSelectAllApi(page: number, size: number) {
  try {
    console.log("Get 실행");
    const response = await fetch(
      `${BASE_URL}/1/boards/page=${page}&size=${size}`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzU3MjY0NzQsImV4cCI6MTY3NTczMDA3NH0.YUyGgfX5Vnqg8g-_sT_0k_RqAlOfUMqwConmVXoDXeZn3yq6batsgSa99e51sxgY05-KVIlhMrsqlcgpbi3RhA",
          Accept: "application / json",
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
