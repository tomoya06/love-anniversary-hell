import { createContext } from "react";
import { GameStatus } from "./types";
import React from "react";

export const GameControlContext = createContext<{
  gameStatus: GameStatus;
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
}>({
  gameStatus: GameStatus.home,
  setGameStatus: () => void 0,
});
