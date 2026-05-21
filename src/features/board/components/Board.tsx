import Square from "./Square";
import "./Board.css";

import { useGame } from "../../../hooks/useGame";

const Board = () => {
  const { state, playMove } = useGame();

  return (
    <div className="board">
      {state.board.map((square, index) => (
        <Square
          key={index}
          value={square}
          onClick={() => playMove(index)}
        />
      ))}
    </div>
  );
};

export default Board;