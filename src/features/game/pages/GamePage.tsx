import Board from "../../board/components/Board";
import GameStatus from "../components/GameStatus";
import RestartButton from "../components/RestartButton";
import TurnIndicator from "../components/TurnIndicator";
import { useGame } from "../hooks/useGame";
import { useRedirectToResult } from "../hooks/useRedirectToResult";

export const GamePage = () => {
  const { players } = useGame();
  useRedirectToResult();

  return (
    <main className="page-shell">
      <section className="game-panel">
        <p className="eyebrow">
          {players.X} vs {players.O}
        </p>
        <h1>Tic Tac Toe</h1>

        <TurnIndicator />
        <Board />
        <GameStatus />
        <RestartButton />
      </section>
    </main>
  );
};
