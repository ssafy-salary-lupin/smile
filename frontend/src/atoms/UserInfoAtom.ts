import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const UserIdState = atom({
  key: "UserIdState",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

// 값 잘 넘어오는 지 테스트용
export const SelectorUserId = selector({
  key: "selectorTest",
  get: ({ get }) => {
    // options의 매개변수에 있는 {get} function 가져오기
    const data = get(UserIdState);
    return data;
  },
});
