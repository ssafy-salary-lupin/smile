import axios from "axios";

const BASE_URL = `https://i8b205.p.ssafy.io/be-api/users`;
// const BASE_URL = `/be-api/users`;
const token = localStorage.getItem("kakao-token");
// const token =
//   "eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYzMDEyNDYsImV4cCI6MTY3NjM4NzY0Nn0.ZysqSzrc7kyFB37Lh7Xy5wBFcngkv68arQlFHULGCAoPoN3mmrasVwkh7voaWZqor_e5lLLFIhqPWu7p-pIO0A";
//   "eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoib3RoNTQ0N0BuYXZlci5jb20iLCJ1c2VySWQiOjYsImlzcyI6Imlzc3VlciIsImlhdCI6MTY3NTkyNzY1NywiZXhwIjoxNjc2MDE0MDU3fQ.o-ZrZL6i3jnBiZsiPc0Y1fSf_cb3BJVxUg5Ks4y_30iosfPWxTuMC5r6TRUJrRHh2sWF8QfUErmz_kry3p649g";
interface StudiesData {
  config: object;
  data: {
    isSuccess: boolean;
    code: number;
    message: string;
    result: {
      studiesCount: number;
      studies: [
        {
          id: number;
          name: string;
          imagePath: string;
          description: string;
          currentPerson: number;
          maxPerson: number;
          viewCount: number;
          lastVisitTime: string;
          leader: {
            id: number;
            imagePath: string;
            nickname: string;
          };
          end: boolean;
        },
      ];
    };
  };
  headers: object;
  request: object;
  status: number;
  statusText: string;
}

// 내 스터디 목록 불러오기
export async function MyStudyApi(userId: string) {
  console.log("MY-STUDY-API START");
  console.log("TOKEN: ", token);
  try {
    console.log(`${BASE_URL}/${userId}/studies`);
    const response: StudiesData = await axios.get(
      `${BASE_URL}/${userId}/studies`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    console.log(response);

    const studies = response.data.result.studies;

    console.log(studies);

    const studyObj = {
      current: studies?.filter((study) => study.end === false),
      end: studies?.filter((study) => study.end === true),
    };

    console.log("TEST:", studyObj);

    return studyObj;
  } catch (error: any) {
    console.log(error);
  }
}
