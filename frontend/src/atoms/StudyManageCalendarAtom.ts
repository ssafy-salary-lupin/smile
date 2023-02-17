import { atom, selector } from "recoil";

// recoil 추가..
export const Schedules = atom({
  key: "isSchedules",
  default: [{}],
});

// 일정 단건
export const ScheduleRegist = atom({
  key: "scheduleRegist",
  default: {},
});

// 값 잘 넘어오는 지 테스트용
export const Selector = selector({
  key: "selectorTest",
  get: ({ get }) => {
    // options의 매개변수에 있는 {get} function 가져오기
    const data = get(Schedules);
    return data;
  },
});
