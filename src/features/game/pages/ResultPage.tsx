import { Link } from "react-router-dom";
import { useGame } from "../hooks/useGame";

export const ResultPage = () => {
  const { history, isDraw, players, restartGame, winner } = useGame();

  const resultText = winner
    ? `Gano ${players[winner]} (${winner})`
    : isDraw
      ? "La partida termino en empate"
      : "Aun no hay una partida finalizada";

  return (
    <main className="page-shell">
      <section className="panel result-panel">
        <p className="eyebrow">Resultado</p>
        <h1>{resultText}</h1>

        <div className="actions">
          <Link
            className="button button--primary"
            to="/game"
            onClick={restartGame}
          >
            Jugar otra vez
          </Link>
          <Link className="button button--secondary" to="/">
            Cambiar jugadores
          </Link>
        </div>

        <section className="history-section">
          <h2>Historial de partidas</h2>

          {history.length === 0 ? (
            <p>No hay partidas registradas todavia.</p>
          ) : (
            <ol className="history-list">
              {history.map((match) => (
                <li key={match.id}>
                  <span>
                    {match.players.X} vs {match.players.O}
                  </span>
                  <strong>
                    {match.result === "draw"
                      ? "Empate"
                      : `Gano ${match.players[match.result]}`}
                  </strong>
                  <small>{match.finishedAt}</small>
                </li>
              ))}
            </ol>
          )}
        </section>
      </section>
    </main>
  );
};
