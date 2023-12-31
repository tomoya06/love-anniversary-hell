import dayjs from "dayjs";

export enum GameStatus {
  home,
  gaming,
  finish,
}

export type AnnInput = {
  ret: boolean;
  shortcut: string;
  msg: string;
};

// 输入日期，输出[是否为纪念日, 回答true的反应, 回答false的反应]
export type AnnCalculator = (
  date: dayjs.Dayjs,
  startDate: dayjs.Dayjs
) =>
  | {
      ret: true;
      true: [string, number];
      false: [string, number];
    }
  | undefined;
