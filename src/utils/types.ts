import dayjs from "dayjs";

export enum GameStatus {
  home,
  gaming,
  finish,
}

export enum AnnInputType {
  false = 0,
  true = 1,
  bonus = 2,
}

export type AnnInput = {
  ret: AnnInputType;
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
