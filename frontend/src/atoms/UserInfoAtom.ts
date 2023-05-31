import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const UserIdState = atom({
  key: "UserIdState",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
