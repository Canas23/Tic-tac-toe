import { useGame } from "../hooks/useGame";

const TurnIndicator = () => {
  const { currentPlayer, getPlayerName, isGameOver } = useGame();

  if (isGameOver) {
    return null;
  }

  return (
    <h2>
      Turno: {getPlayerName(currentPlayer)} ({currentPlayer})
    </h2>
  );
};

export default TurnIndicator;
