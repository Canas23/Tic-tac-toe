import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthHeader } from "../auth/components/AuthHeader";
import { ProtectedRoute } from "../auth/components/ProtectedRoute";
import { AuthProvider } from "../auth/context/AuthProvider";
import { LoginPage } from "../auth/pages/LoginPage";
import { RegisterPage } from "../auth/pages/RegisterPage";
import { GameProvider } from "../features/game/context/GameProvider";
import { GamePage } from "../features/game/pages/GamePage";
import { HomePage } from "../features/game/pages/HomePage";
import { ResultPage } from "../features/game/pages/ResultPage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GameProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route element={<ProtectedRoute />}>
              <Route
                path="/"
                element={
                  <>
                    <AuthHeader />
                    <HomePage />
                  </>
                }
              />
              <Route
                path="/game"
                element={
                  <>
                    <AuthHeader />
                    <GamePage />
                  </>
                }
              />
              <Route
                path="/result"
                element={
                  <>
                    <AuthHeader />
                    <ResultPage />
                  </>
                }
              />
            </Route>
          </Routes>
        </GameProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
