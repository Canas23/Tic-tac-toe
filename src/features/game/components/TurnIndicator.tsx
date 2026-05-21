import { useGame } from "../../../hooks/useGame";

const TurnIndicator = () => {
  const { state } = useGame();

  return (
    <h2>
      Current Player: {state.currentPlayer}
    </h2>
  );
};

export default TurnIndicator;