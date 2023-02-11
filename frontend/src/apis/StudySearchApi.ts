import axios from "axios";
import { useRecoilState } from "recoil";
import { SearchNameState } from "atoms/SearchAtom";

// const BASE_URL = `https://i8b205.p.ssafy.io/be-api/studies`;
const BASE_URL = `/be-api`;
const token = localStorage.getItem("kakao-token");

const api = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-type": "application/json; charset=UTF-8",
    accept: "application/json,",
  },
});

const Search = () => {
  const [searchName, setSearchName] = useRecoilState<string>(SearchNameState);
  // const [searchType, setSearchType] = useRecoilState<string>(SearchState);
};

export const StudySearchAll = {
  get: api.get("/studies"),
};
