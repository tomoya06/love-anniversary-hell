import { useMemo, useState } from "react";
import { ChatItem } from "./types";
import dayjs from "dayjs";

export default function ChatPage() {
  const [life, setLife] = useState(100);

  const [curDate, setCurDate] = useState(dayjs());
  const [chats, setChats] = useState<ChatItem[]>([
    {
      me: false,
      msg: "早安啊宝宝",
    },
    {
      me: true,
      msg: "安安",
    },
  ]);

  const displayChatDate = useMemo(() => {
    return curDate.format("YYYY-MM-DD");
  }, [curDate]);

  return (
    <div
      id="chatpage"
      className="w-full h-full md:w-640 md:h-480 bg-slate-100 flex flex-col"
    >
      <div id="chatheader" className="">
        <div id="statusbar" className="px-4 h-4 leading-3 flex">
          <span className="text-xs mr-2 w-10 text-left">亲密度</span>
          <span className="inline-block grow">
            <span
              className="inline-block h-2 bg-red-500 rounded-full"
              style={{ width: `${(life / 100) * 100}%` }}
            ></span>
          </span>
          <span className="text-xs ml-2 w-8 text-right">{life}</span>
        </div>
        <div
          id="chatbar"
          className="h-12 bg-slate-800 text-white flex items-center justify-center"
        >
          <span className="text-md font-semibold">宝宝❤</span>
        </div>
      </div>
      <div id="chatlist" className="grow px-4">
        <div className="text-slate-400 text-xs text-center my-2">
          {displayChatDate}
        </div>
        {chats.map((chat) => {
          if (chat.me) {
            return (
              <div className="flex my-4 justify-start">
                <div className="avatar size-8 mr-2 bg-red-100 rounded-full flex items-center justify-center">
                  ❤
                </div>
                <div className="px-4 py-2 text-sm bg-cyan-500 text-white rounded-full shadow-sm">
                  {chat.msg}
                </div>
              </div>
            );
          }
          return (
            <div className="flex my-4 justify-end">
              <div className="px-4 py-2 text-sm bg-cyan-500 text-white rounded-full shadow-sm">
                {chat.msg}
              </div>
              <div className="avatar size-8 ml-2 bg-blue-100 rounded-full flex items-center justify-center">
                🐷
              </div>
            </div>
          );
        })}
      </div>
      <div id="chatcontrol" className="h-14 bg-white"></div>
    </div>
  );
}
