import dayjs from "dayjs";
import { useGame } from "./control";
import { Fragment, useMemo } from "react";
import { random } from "lodash";
import { MAX_LIFE, MAX_MONEY } from "../../utils/constants";

export default function ChatPage() {
  const { life, money, chatDate, chats, sysMsgs, userInput, handleInput } =
    useGame(dayjs("2020-12-08").add(random(0, 1000), "days"));

  const blurChat = useMemo(() => {
    return life <= 0 || sysMsgs.length > 0 ? "blur-sm" : "blur-none";
  }, [sysMsgs, life]);

  return (
    <Fragment>
      {sysMsgs.length > 0 ? (
        <div className="fixed left-4 right-4 top-24 z-10 flex flex-col items-end">
          {sysMsgs.map((msg, index) => (
            <div
              className="py-2 px-4 rounded-md my-1 bg-white shadow text-sm text-right w-auto shadow"
              key={JSON.stringify({ index, msg })}
            >
              {msg}
            </div>
          ))}
        </div>
      ) : null}
      <div className="w-full h-full flex justify-center">
        {/* FIXME: why query breakpoint not working */}
        <div
          id="chatpage"
          className={`w-full h-full md:w-640 bg-slate-100 flex flex-col ${blurChat}`}
        >
          <div id="chatheader">
            <div id="statusbar_life" className="px-4 leading-3 flex">
              <span className="text-xs mr-2 w-20 text-left">亲密度</span>
              <span className="inline-block grow">
                <span
                  className="inline-block h-2 bg-red-500 rounded-full"
                  style={{ width: `${(life / MAX_LIFE) * 100}%` }}
                ></span>
              </span>
              <span className="text-xs ml-2 w-20 text-right">
                {life.toFixed(1)}
              </span>
            </div>
            <div id="statusbar_money" className="px-4 leading-3 flex">
              <span className="text-xs mr-2 w-20 text-left">储蓄</span>
              <span className="inline-block grow">
                <span
                  className="inline-block h-2 bg-green-500 rounded-full"
                  style={{ width: `${(money / MAX_MONEY) * 100}%` }}
                ></span>
              </span>
              <span className="text-xs ml-2 w-20 text-right">
                ¥{money.toFixed(2)}
              </span>
            </div>
            <div
              id="chatbar"
              className="h-12 bg-slate-800 flex items-center justify-center"
            >
              <span className="text-md font-semibold text-white">宝宝❤</span>
            </div>
          </div>
          <div id="chatlist" className="grow px-4 overflow-y-scroll relative">
            <div className="text-slate-400 text-xs text-center my-2 sticky top-0">
              {chatDate}
            </div>
            {chats.map((chat, idx) => {
              return (
                <div
                  className={
                    "flex my-4 w-full " +
                    `${!chat.me ? "" : "flex-row-reverse"}`
                  }
                  key={JSON.stringify({ idx, chat })}
                >
                  <div className="avatar size-8 mx-2 bg-red-100 rounded-full flex items-center justify-center">
                    {!chat.me ? "❤" : "🐷"}
                  </div>
                  {!chat.bonus ? (
                    <div className="px-4 py-2 text-sm bg-cyan-500 text-white rounded-full shadow-sm whitespace-pre">
                      {chat.msg}
                    </div>
                  ) : (
                    <div className="px-4 py-2 bg-red-500 w-200 text-white text-center rounded-lg shadow-sm whitespace-pre">
                      <div className=" text-sm">{chat.msg}</div>
                      <div className="text-lg">¥{chat.bonus}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div
            id="chatcontrol"
            className="h-14 bg-white flex align-center justify-center py-2"
          >
            {userInput.length > 0 ? (
              <Fragment>
                {userInput.map((input) => (
                  <button
                    key={`userInput_${input.shortcut}`}
                    className="rounded-md px-4 py-2 shadow mx-2"
                    onClick={() => handleInput(input)}
                  >
                    {input.shortcut}
                  </button>
                ))}
              </Fragment>
            ) : (
              <Fragment></Fragment>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
