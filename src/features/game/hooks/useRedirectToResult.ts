import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "./useGame";

export const useRedirectToResult = () => {
  const navigate = useNavigate();
  const { isGameOver, recordFinishedGame } = useGame();

  useEffect(() => {
    if (!isGameOver) {
      return;
    }

    recordFinishedGame();
    navigate("/result");
  }, [isGameOver, navigate, recordFinishedGame]);
};
