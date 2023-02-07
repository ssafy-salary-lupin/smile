import { atom, selector } from "recoil";

export const LoginToken = atom({
  key: "token",
  default: "",
});

// 값 잘 넘어오는 지 테스트용
export const LoginSelector = selector({
  key: "LoginSelectorTest",
  get: ({ get }) => {
    // options의 매개변수에 있는 {get} function 가져오기
    const data = get(LoginToken);
    return data;
  },
});
