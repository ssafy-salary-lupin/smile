import axios from "axios";

const BASE_URL = `https://i8b205.p.ssafy.io/be-api/users`;
// const BASE_URL = `/be-api/users`;
const token = localStorage.getItem("kakao-token");
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
