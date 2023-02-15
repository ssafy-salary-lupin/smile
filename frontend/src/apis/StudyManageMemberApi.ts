import axios from "axios";

const BASE_URL = `https://i8b205.p.ssafy.io/be-api/studies`;
// const BASE_URL = `/be-api/studies`;
const token = localStorage.getItem("kakao-token");
const formData = new FormData();

// // 스터디에 속한 유저 정보 가져오기
export async function StudyUserApi(studyId: string) {
  try {
    const response = await fetch(`${BASE_URL}/${studyId}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoidGhkcmxmazkzQG5hdmVyLmNvbSIsInVzZXJJZCI6NywiaXNzIjoiaXNzdWVyIiwiaWF0IjoxNjc2MzUyNDM3LCJleHAiOjE2NzY0Mzg4Mzd9.sqgqiWk9EIMREdpt4FgA5vjz_Qr8-Fgx1rhKuq-1MRyPbQ2SLUN3Ohyr755_cYa_eQ_dPnisLwsnXF0ig2AEVg`,
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
export async function MandateApi(studyId: string, userId: string) {
  try {
    console.log("Man");
    const response = await axios.patch(
      `${BASE_URL}/${studyId}/users/${userId}/delegate`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoidGhkcmxmazkzQG5hdmVyLmNvbSIsInVzZXJJZCI6NywiaXNzIjoiaXNzdWVyIiwiaWF0IjoxNjc2MzUyNDM3LCJleHAiOjE2NzY0Mzg4Mzd9.sqgqiWk9EIMREdpt4FgA5vjz_Qr8-Fgx1rhKuq-1MRyPbQ2SLUN3Ohyr755_cYa_eQ_dPnisLwsnXF0ig2AEVg`,
          Accept: "application/json",
        },
      },
    );
    const data = await response;
    console.log("Mandate");
    console.log(data);
    return data;
  } catch (error: any) {
    console.log(error);
  }
}

// // 강퇴
export async function UserDropApi(studyId: string, userId: string) {
  try {
    console.log("DDDDD");
    const response = await axios.delete(
      `${BASE_URL}/${studyId}/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoidGhkcmxmazkzQG5hdmVyLmNvbSIsInVzZXJJZCI6NywiaXNzIjoiaXNzdWVyIiwiaWF0IjoxNjc2MzUyNDM3LCJleHAiOjE2NzY0Mzg4Mzd9.sqgqiWk9EIMREdpt4FgA5vjz_Qr8-Fgx1rhKuq-1MRyPbQ2SLUN3Ohyr755_cYa_eQ_dPnisLwsnXF0ig2AEVg`,
          Accept: "application/json",
        },
      },
    );
    const data = await response;
    console.log("Drop");
    console.log(data);
    return data;
  } catch (error: any) {
    console.log(error);
  }
}

// // 스터디 종료
export async function StudyEndApi(studyId: string) {
  try {
    const response = await axios.patch(
      `${BASE_URL}/${studyId}/close`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoidGhkcmxmazkzQG5hdmVyLmNvbSIsInVzZXJJZCI6NywiaXNzIjoiaXNzdWVyIiwiaWF0IjoxNjc2MzUyNDM3LCJleHAiOjE2NzY0Mzg4Mzd9.sqgqiWk9EIMREdpt4FgA5vjz_Qr8-Fgx1rhKuq-1MRyPbQ2SLUN3Ohyr755_cYa_eQ_dPnisLwsnXF0ig2AEVg`,
          Accept: "application/json",
        },
      },
    );
    const data = await response;
    console.log("End");
    console.log(data);
    return data;
  } catch (error: any) {
    console.log(error);
  }
}

// // 스터디 모집
export async function StudyRecruitmentApi(studyId: string) {
  try {
    console.log("token", token);
    console.log("???");
    const response = await axios.patch(
      `${BASE_URL}/${studyId}/recruit`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoidGhkcmxmazkzQG5hdmVyLmNvbSIsInVzZXJJZCI6NywiaXNzIjoiaXNzdWVyIiwiaWF0IjoxNjc2MzUyNDM3LCJleHAiOjE2NzY0Mzg4Mzd9.sqgqiWk9EIMREdpt4FgA5vjz_Qr8-Fgx1rhKuq-1MRyPbQ2SLUN3Ohyr755_cYa_eQ_dPnisLwsnXF0ig2AEVg`,
          Accept: "application/json",
        },
      },
    );
    const data = await response;
    console.log("recruit");
    console.log(data);
    return data;
  } catch (error: any) {
    console.log(error);
  }
}

// // 스터디 마감
export async function StudyReDeadlineApi(studyId: string) {
  try {
    const response = await axios.patch(
      `${BASE_URL}/${studyId}/deadline`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoidGhkcmxmazkzQG5hdmVyLmNvbSIsInVzZXJJZCI6NywiaXNzIjoiaXNzdWVyIiwiaWF0IjoxNjc2MzUyNDM3LCJleHAiOjE2NzY0Mzg4Mzd9.sqgqiWk9EIMREdpt4FgA5vjz_Qr8-Fgx1rhKuq-1MRyPbQ2SLUN3Ohyr755_cYa_eQ_dPnisLwsnXF0ig2AEVg`,
          Accept: "application/json",
        },
      },
    );
    const data = await response;
    console.log("deadline");
    console.log(data);
    return data;
  } catch (error: any) {
    console.log(error);
  }
}
