import { fakeValuntines } from "./fakefestival";
import { AnnCalculator } from "./types";

export const ann_basic: AnnCalculator = (date, startDate) => {
  const diffYear = date.diff(startDate, "year", true);
  const isYear = Number.isInteger(diffYear);
  if (isYear) {
    return {
      ret: true,
      trueResp: [`${diffYear}周年快乐!`, 2],
      falseResp: ["", -1],
    };
  }

  const monthDiff = date.diff(startDate, "month", true);
  if ([1, 2, 3, 5, 10, 15, 20, 30, 50, 100, 200].includes(monthDiff)) {
    return {
      ret: true,
      trueResp: [`我们在一起${monthDiff}个月啦！`, 0.5],
      falseResp: ["", -0.3],
    };
  }

  return undefined;
};

export const ann_week_easy: AnnCalculator = (date, startDate) => {
  const weekDiff = date.diff(startDate, "week", true);
  if ([1, 2, 3, 5, 6, 8, 10, 20, 30, 50, 100, 200].includes(weekDiff)) {
    return {
      ret: true,
      trueResp: [`我们在一起${weekDiff}个星期啦`, 0.03],
    };
  }

  return undefined;
};

export const ann_festivals: AnnCalculator = (date) => {
  const fest = lunisolar(date.toDate()).markers.toString();
  if (!fest) {
    return undefined;
  }

  return {
    ret: true,
    trueResp: [`今天是${fest}`, 1],
    falseResp: [`你忘了今天是${fest}吗？`, -1],
  };
};

export const ann_chanhuiMonth: AnnCalculator = (date) => {
  const formatDate = date.format("M,DD");
  if (fakeValuntines[formatDate]) {
    return {
      ret: true,
      trueResp: [`今天是${fakeValuntines[formatDate]}`, 1],
      falseResp: [`你不知道今天是${fakeValuntines[formatDate]}吗？`, 1],
    };
  }
};
