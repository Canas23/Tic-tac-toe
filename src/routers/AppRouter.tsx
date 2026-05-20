import { BrowserRouter, Routes, Route } from "react-router-dom";

import {HomePage} from "../features/game/pages/HomePage";
import {GamePage} from "../features/game/pages/GamePage";
import {ResultPage} from "../features/game/pages/ResultPage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
};

