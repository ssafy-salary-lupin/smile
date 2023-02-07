import { atom, selector } from "recoil";

export const LoginToken = atom({
  key: "token",
  default: "",
});
