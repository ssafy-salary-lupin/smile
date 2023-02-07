import { atom } from "recoil";

export const LoginToken = atom({
  key: "token",
  default: "",
});
