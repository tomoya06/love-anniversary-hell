import dayjs from "dayjs";

export enum GameStatus {
  home,
  gaming,
  finish,
}

// 输入日期，输出[是否为纪念日, 回答true的反应, 回答false的反应]
export type AnnCalculator = (
  date: dayjs.Dayjs,
  startDate: dayjs.Dayjs
) =>
  | {
      ret: boolean;
      trueResp?: [string, number];
      falseResp?: [string, number];
    }
  | undefined;
