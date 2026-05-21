import { useGame } from "../../../hooks/useGame";

const GameStatus = () => {
  const { state } = useGame();

  if (state.winner) {
    return <h2>Winner: {state.winner}</h2>;
  }

  if (state.isDraw) {
    return <h2>Draw Game</h2>;
  }

  return null;
};

export default GameStatus;