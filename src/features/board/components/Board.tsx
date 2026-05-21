import { useGame } from "../../game/hooks/useGame";
import Square from "./Square";
import "./board.css";

const Board = () => {
  const { board, isGameOver, playMove } = useGame();

  return (
    <div className="board" aria-label="Tablero de Tic Tac Toe">
      {board.map((square, index) => (
        <Square
          key={index}
          value={square}
          disabled={isGameOver || square !== null}
          onClick={() => playMove(index)}
        />
      ))}
    </div>
  );
};

export default Board;
