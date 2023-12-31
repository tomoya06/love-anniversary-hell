import dayjs from "dayjs";
import { useGame } from "./control";
import { Fragment, useMemo } from "react";
import { random } from "lodash";

export default function ChatPage() {
  const { life, chatDate, chats, sysMsgs, userInput, handleInput } = useGame(
    dayjs("2020-12-08").add(random(0, 1000), "days")
  );

  const blurChat = useMemo(() => {
    return life <= 0 || sysMsgs.length > 0 ? "blur-sm" : "blur-none";
  }, [sysMsgs, life]);

  return (
    <Fragment>
      {sysMsgs.length > 0 ? (
        <div className="fixed left-4 right-4 top-10 z-10 flex flex-col items-end">
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
              className="h-12 bg-slate-800 flex items-center justify-center"
            >
              <span className="text-md font-semibold text-white">宝宝❤</span>
            </div>
          </div>
          <div id="chatlist" className="grow px-4">
            <div className="text-slate-400 text-xs text-center my-2">
              {chatDate}
            </div>
            {chats.map((chat, idx) => {
              if (!chat.me) {
                return (
                  <div
                    className="flex my-4 justify-start"
                    key={JSON.stringify({ idx, chat })}
                  >
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
                <div
                  className="flex my-4 justify-end"
                  key={JSON.stringify({ idx, chat })}
                >
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
