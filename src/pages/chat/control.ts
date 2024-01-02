import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ChatItem } from "./types";
import { AnnInput, AnnInputType } from "../../utils/types";
import { ann_basic } from "../../utils/anniversary";
import delayFunc from "delay";
import { random, shuffle } from "lodash";
import { MAX_LIFE, MAX_MONEY } from "../../utils/constants";
import { toast } from "react-toastify";

const delay = (t: number) => {
  if (location.search.includes("fast=1")) {
    return delayFunc(t / 10);
  }
  return delayFunc(t);
};

type SysMsgsType = string;
type ChatsType = ChatItem;

export const useGame = (initDate: dayjs.Dayjs) => {
  const [startDate] = useState(initDate);
  const [life, setLife] = useState(MAX_LIFE / 2);
  const [money, setMoney] = useState(MAX_MONEY);
  const [curDate, setCurDate] = useState(startDate);
  const [chats, setChats] = useState<ChatsType[]>([]);
  const [userInput, setUserInput] = useState<AnnInput[]>([]);
  const [blur, setBlur] = useState(false);

  const displayChatDate = useMemo(() => {
    return curDate.format("YYYY-MM-DD");
  }, [curDate]);

  const appendSysMsg = async (sysMsgs: SysMsgsType, dt = 0) => {
    await delay(dt);
    toast(sysMsgs);
  };

  const appendChat = async (chat: ChatsType, dt = 0) => {
    await delay(dt);
    setChats((prev) => [...prev, chat]);
  };

  const generateFakeChats = async (lo = 1, hi = 5) => {
    const randomChatCnt = random(lo, hi);
    for (let i = 0; i < randomChatCnt; i++) {
      await delay(random(100, 500));
      setChats((prev) => [
        ...prev,
        {
          me: Boolean(Math.round(random(0, 1, true))),
          msg: "\t".repeat(random(4, 10)),
        },
      ]);
    }
  };

  const gameStart = async () => {
    if (location.search.includes("skipintro=1")) {
      return;
    }

    await appendSysMsg("早上好", 0);
    await appendSysMsg(
      `${startDate.format("YYYY 年 M 月 D 日")}，这是你们在一起的第一天`,
      1000
    );
    await appendSysMsg("请好好相处吧", 1000);
    await delay(1000);
    toast.dismiss();
  };

  const newDayStart = useCallback(async () => {
    setChats(() => [{ me: true, msg: "早上好" }]);
    await delay(random(1000, 3000));
    setChats((prev) => [...prev, { me: false, msg: "早" }]);
    await delay(1000);

    // FIXME: 生成多种语法

    setUserInput(
      shuffle<AnnInput>([
        {
          ret: AnnInputType.true,
          shortcut: "今天是纪念日",
          msg: "宝宝，纪念日快乐",
        },
        { ret: AnnInputType.false, shortcut: "今日和平", msg: "吃了吗今天" },
        {
          ret: AnnInputType.bonus,
          shortcut: "发个红包",
          msg: "宝宝给你发个红包",
        },
      ])
    );
  }, []);

  useEffect(() => {
    (async () => {
      setBlur(true);
      await Promise.all([generateFakeChats(), gameStart()]);
      setBlur(false);
      await newDayStart();
    })();
  }, []);

  const handleInput = async (input: AnnInput) => {
    setUserInput([]);
    setChats((prev) => [...prev, { me: true, msg: input.msg }]);

    if (input.ret === AnnInputType.bonus) {
      const sendBonus = Math.floor(random(2000, 20000, true)) / 100;
      setMoney((money) => money - sendBonus);
      appendChat({ me: true, msg: "宝宝给你发了个红包", bonus: sendBonus });
    }

    const resp = ann_basic(curDate, startDate);
    await delay(random(2000, 5000));

    if (resp?.ret) {
      // 有纪念日
      // 红包或者提纪念日都算赢
      const key: "true" | "false" = `${Boolean(input.ret)}`;
      setLife((life) => life + 10 * resp[key][1]);
      appendChat({ me: false, msg: resp[key][0] });
    } else {
      // 没有纪念日
      if (input.ret === AnnInputType.bonus) {
        setLife((life) => life + random(0, 10, true));
        appendChat({ me: false, msg: "谢谢宝宝，宝宝真棒" });
      } else if (input.ret === AnnInputType.true) {
        setLife((life) => life - random(0, 5, true));
        appendChat({ me: false, msg: "谢谢宝宝，可今天不是纪念日呀" });
      } else {
        appendChat({ me: false, msg: "嗯嗯" });
      }
    }

    await delay(3000);
    setBlur(true);
    await finishOneDay();

    if (life <= 0 || money <= 0) return;
    await delay(random(1000, 3000));
    await newDayStart();

    setBlur(false);
  };

  const finishOneDay = async () => {
    toast("...");
    await Promise.all([generateFakeChats(), delay(2000)]);
    setCurDate(() => curDate.add(1, "day"));

    if (life > 0 && money > 0) {
      await appendSysMsg("一天结束了");
      await appendSysMsg("两人安然入睡，迎接新的一天", 1000);
      await delay(1000);

      toast.dismiss();

      await appendSysMsg(
        `今天是${curDate.format(
          " YYYY 年 M 月 D 日"
        )}，是你们在一起的第 ${curDate.diff(startDate, "day")} 天`,
        2000
      );
      return;
    }
    if (life <= 0) {
      toast("一天结束了");
      appendSysMsg("对方觉得你的心里没有她，决定跟你分手", 1000);
      await delay(5000);
      // setSysMsgs([]);
      return;
    }
    if (money <= 0) {
      toast("一天结束了");
      appendSysMsg("你花光了所有的积蓄，无奈只能提出分手", 1000);
      await delay(5000);
      // setSysMsgs([]);
      return;
    }
  };

  return {
    blur,
    life,
    money,
    chatDate: displayChatDate,
    chats,
    userInput,
    handleInput,
  };
};
