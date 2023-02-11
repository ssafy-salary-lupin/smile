import { atom, selector } from "recoil";

export const SearchNameState = atom({
  key: "seachNameInput",
  default: "",
});

export const SearchTypeState = atom<number[]>({
  key: "seachTypeInput",
  default: [],
});
