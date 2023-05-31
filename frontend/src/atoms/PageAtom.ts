import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const PageState = atom({
  key: "PageState",
  default: "/",
  effects_UNSTABLE: [persistAtom],
});
