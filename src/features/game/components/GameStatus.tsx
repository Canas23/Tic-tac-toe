import { useGame } from "../hooks/useGame";

const GameStatus = () => {
  const { winner, isDraw, getPlayerName } = useGame();

  if (winner) {
    return (
      <p className="status">
        Ganador: {getPlayerName(winner)} ({winner})
      </p>
    );
  }

  if (isDraw) {
    return <p className="status">La partida termino en empate.</p>;
  }

  return <p className="status">Selecciona una casilla libre para jugar.</p>;
};

export default GameStatus;
