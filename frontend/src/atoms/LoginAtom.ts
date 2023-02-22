import { atom } from "recoil";
<<<<<<< HEAD

export const LoginToken = atom({
  key: "token",
  default: "",
=======
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const LoginState = atom({
  key: "LoginState",
  default: false,
  effects_UNSTABLE: [persistAtom],
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
});
