import axios from "axios";

// const BASE_URL = `https://i8b205.p.ssafy.io/be-api/users`;
const BASE_URL = `/be-api/users`;

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
          studyId: number;
          name: string;
          imageUrl: string;
          description: string;
          person: number;
          maxPerson: number;
          views: number;
          lastVisitTime: string;
          studyLeader: {
            userId: number;
            profileImageUrl: string;
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
  try {
    console.log("Get 실행");
    console.log(`${BASE_URL}/${userId}/studies`);
    const response: StudiesData = await axios.get(
      `${BASE_URL}/${userId}/studies`,
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
