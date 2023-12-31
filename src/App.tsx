import { useState } from "react";
import { GameStatus } from "./utils/types";
import HomePage from "./pages/home";
import ChatPage from "./pages/chat";
import { GameControlContext } from "./utils/store";

function App() {
  const [gameStatus, setGameStatus] = useState(GameStatus.gaming);
  return (
    <GameControlContext.Provider
      value={{
        gameStatus,
        setGameStatus,
      }}
    >
      <div className="w-full h-full">
        {gameStatus === GameStatus.home && <HomePage />}
        {gameStatus === GameStatus.gaming && <ChatPage />}
      </div>
    </GameControlContext.Provider>
  );
}

export default App;
