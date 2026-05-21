import { useGame } from "../../../hooks/useGame";

const RestartButton = () => {
  const { restartGame } = useGame();

  return (
    <button onClick={restartGame}>
      Restart Game
    </button>
  );
};

export default RestartButton;