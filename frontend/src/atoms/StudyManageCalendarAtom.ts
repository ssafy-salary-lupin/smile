import { atom } from "recoil";

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

//
