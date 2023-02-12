import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { SearchNameState, SearchTypeState } from "atoms/SearchAtom";
import { useState } from "react";

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

// const Search = () => {
//   const [searchName, setSearchName] = useRecoilState<string>(SearchNameState);
//   const [searchType, setSearchType] = useRecoilState<number[]>(SearchTypeState);

//   const searchValue = `/studies?${searchName ? "name=" + searchName : null}&${
//     searchType ? "type=" + searchType : null
//   }`;
//   console.log("SEARCH", searchValue);
//   return searchValue;
// };

// export const StudySearchAll = {
//   get: api.get(Search()),
// };

export const StudySearchAll = {
  api: api,
};
