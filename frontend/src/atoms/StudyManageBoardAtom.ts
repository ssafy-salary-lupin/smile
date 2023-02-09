import { atom } from "recoil";

export const PageAtom = atom({
  key: "pageAtom",
  default: 1,
});

export const SizeAtom = atom({
  key: "sizeAtom",
  default: 7,
});
