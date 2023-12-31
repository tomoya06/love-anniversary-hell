import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ChatItem } from "./types";
import { delay } from "../../utils";

type SysMsgsType = string[];
type ChatsType = ChatItem[];

export const useGame = (startDate: dayjs.Dayjs) => {
  const [life, setLife] = useState(100);
  const [curDate, setCurDate] = useState(startDate);
  const [chats, setChats] = useState<ChatsType>([]);
  const [sysMsgs, setSysMsgs] = useState<SysMsgsType>([]);

  const displayChatDate = useMemo(() => {
    return curDate.format("YYYY-MM-DD");
  }, [curDate]);

  const gameStart = useCallback(async () => {
    setSysMsgs(() => [""]);
    setSysMsgs(() => ["早上好"]);
    await delay(1000);
    setSysMsgs((prev) => [...prev, "这是你们在一起的第一天"]);
    await delay(1000);
    setSysMsgs((prev) => [...prev, "请好好相处吧"]);
    await delay(2000);
    setSysMsgs([]);
  }, [setSysMsgs]);

  const newDayStart = useCallback(async () => {
    await delay(1000 * (Math.random() + 1));
    setChats(() => [{ me: true, msg: "早上好" }]);
    await delay(1000 * (Math.random() + 1));
    setChats((prev) => [...prev, { me: false, msg: "早" }]);
    await delay(1000);
  }, [setChats]);

  useEffect(() => {
    (async () => {
      await gameStart();
      await newDayStart();
    })();
  }, []);

  return {
    life,
    chatDate: displayChatDate,
    chats,
    sysMsgs,
  };
};
