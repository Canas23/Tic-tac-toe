import { useGame } from "../hooks/useGame";

const RestartButton = () => {
  const { restartGame } = useGame();

  return (
    <button className="button button--secondary" onClick={restartGame}>
      Reiniciar partida
    </button>
  );
};

export default RestartButton;
