import { useNavigate } from "react-router-dom";
import { PlayerSetupForm } from "../../players/components/PlayerSetupForm";
import { useGame } from "../hooks/useGame";

export const HomePage = () => {
  const navigate = useNavigate();
  const { history, startGame } = useGame();

  const handleStartGame = (playerOneName: string, playerTwoName: string) => {
    startGame(playerOneName, playerTwoName);
    navigate("/game");
  };

  return (
    <main className="page-shell">
      <section className="panel">
        <p className="eyebrow">Entregable 1</p>
        <h1>Tic Tac Toe</h1>
        <p className="lead">
          Ingresa los nombres de los jugadores para iniciar una partida local.
        </p>

        <PlayerSetupForm onStartGame={handleStartGame} />

        {history.length > 0 && (
          <div className="history-preview">
            <h2>Ultima partida</h2>
            <p>
              {history[0].result === "draw"
                ? "Empate"
                : `Gano ${history[0].players[history[0].result]}`}
            </p>
          </div>
        )}
      </section>
    </main>
  );
};
