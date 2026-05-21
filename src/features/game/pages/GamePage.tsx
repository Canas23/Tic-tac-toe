import Board from "../../board/components/Board";

import TurnIndicator from "../components/TurnIndicator";
import RestartButton from "../components/RestartButton";
import GameStatus from "../components/GameStatus";

export const GamePage = () => {
  return (
    <div>
      <h1>Tic Tac Toe</h1>

      <TurnIndicator />

      <Board />

      <GameStatus />

      <RestartButton />
    </div>
  );
};

