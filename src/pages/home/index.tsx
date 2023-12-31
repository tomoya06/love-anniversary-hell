import { useContext } from "react";
import { GameControlContext } from "../../utils/store";
import { GameStatus } from "../../utils/types";

export default function HomePage() {
  const { setGameStatus } = useContext(GameControlContext);

  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl">
        <span className="line-through">LOVE</span> Anniversary HELL
      </div>
      <div className="">
        <button
          className="px-4 py-2 font-semibold text-sm bg-green-500 text-white rounded-full shadow-sm"
          onClick={() => setGameStatus(GameStatus.gaming)}
        >
          Start
        </button>
      </div>
    </div>
  );
}
