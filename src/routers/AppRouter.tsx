import { BrowserRouter, Route, Routes } from "react-router-dom";

import { GameProvider } from "../features/game/context/GameProvider";
import { GamePage } from "../features/game/pages/GamePage";
import { HomePage } from "../features/game/pages/HomePage";
import { ResultPage } from "../features/game/pages/ResultPage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <GameProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </GameProvider>
    </BrowserRouter>
  );
};
