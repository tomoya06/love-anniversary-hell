import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ChatItem } from "./types";
import { AnnInput } from "../../utils/types";
import { ann_basic } from "../../utils/anniversary";
import delayFunc from "delay";
import { random, shuffle } from "lodash";

const delay = (t: number) => {
  if (location.search.includes("fast=1")) {
    return true;
  }
  return delayFunc(t);
};

type SysMsgsType = string[];
type ChatsType = ChatItem[];

export const useGame = (startDate: dayjs.Dayjs) => {
  const [life, setLife] = useState(50);
  const [curDate, setCurDate] = useState(startDate);
  const [chats, setChats] = useState<ChatsType>([]);
  const [sysMsgs, setSysMsgs] = useState<SysMsgsType>([]);
  const [userInput, setUserInput] = useState<AnnInput[]>([]);

  const displayChatDate = useMemo(() => {
    return curDate.format("YYYY-MM-DD");
  }, [curDate]);

  const gameStart = useCallback(async () => {
    if (location.search.includes("skipintro=1")) {
      return;
    }

    setSysMsgs(() => [""]);
    setSysMsgs(() => ["早上好"]);
    await delay(1000);
    setSysMsgs((prev) => [...prev, "这是你们在一起的第一天"]);
    await delay(1000);
    setSysMsgs((prev) => [...prev, "请好好相处吧"]);
    await delay(2000);
    setSysMsgs([]);
  }, []);

  const newDayStart = useCallback(async () => {
    await delay(random(1000, 3000));
    setChats(() => [{ me: true, msg: "早上好" }]);
    await delay(random(1000, 3000));
    setChats((prev) => [...prev, { me: false, msg: "早" }]);
    await delay(1000);

    setUserInput(
      shuffle<AnnInput>([
        { ret: true, shortcut: "今天是纪念日", msg: "宝宝，纪念日快乐" },
        { ret: false, shortcut: "今日和平", msg: "吃了吗今天" },
        { ret: true, shortcut: "发个红包", msg: "宝宝给你发个红包" },
      ])
    );
  }, []);

  useEffect(() => {
    (async () => {
      await gameStart();
      await newDayStart();
    })();
  }, []);

  const handleInput = async (input: AnnInput) => {
    setUserInput([]);
    setChats((prev) => [...prev, { me: true, msg: input.msg }]);
    const resp = ann_basic(curDate, startDate);
    await delay(random(2000, 5000));

    if (resp?.ret) {
      // 有纪念日
      const key: "true" | "false" = `${Boolean(input.ret)}`;
      setLife((life) => life + 10 * resp[key][1]);
      setChats((prev) => [...prev, { me: false, msg: resp[key][0] }]);
    } else {
      // 没有纪念日
      if (input.ret) {
        setLife((life) => life + random(0, 2, true));
        setChats((prev) => [...prev, { me: false, msg: "谢谢宝宝，宝宝真棒" }]);
      } else {
        setChats((prev) => [...prev, { me: false, msg: "嗯嗯" }]);
      }
    }
  };

  return {
    life,
    chatDate: displayChatDate,
    chats,
    sysMsgs,
    userInput,
    handleInput,
  };
};
