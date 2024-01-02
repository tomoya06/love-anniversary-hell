import { useState } from "react";
import { GameStatus } from "./utils/types";
import HomePage from "./pages/home";
import ChatPage from "./pages/chat";
import { GameControlContext } from "./utils/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  const [gameStatus, setGameStatus] = useState(GameStatus.gaming);

  return (
    <GameControlContext.Provider
      value={{
        gameStatus,
        setGameStatus,
      }}
    >
      <div className="w-screen h-screen">
        {gameStatus === GameStatus.home && <HomePage />}
        {gameStatus === GameStatus.gaming && <ChatPage />}
      </div>
      <ToastContainer
        pauseOnFocusLoss={false}
        closeButton={false}
        bodyClassName="text-md font-semibold"
        autoClose={3000}
        hideProgressBar
      />
    </GameControlContext.Provider>
  );
}

export default App;
