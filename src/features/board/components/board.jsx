import { Square } from "./Square";
import { checkSquareAvailability } from "../helpers/boardHelpers";

export const Board = ({
  board,
  currentPlayer,
  onPlay
}) => {

  const handleSquareClick = (position) => {

    const isAvailable = checkSquareAvailability(
      board,
      position
    );

    if (!isAvailable) {
      return;
    }

    onPlay(position, currentPlayer);
  };

  return (
    <div className="board">

      {board.map((square, index) => (
        <Square
          key={index}
          value={square}
          onSelect={() => handleSquareClick(index)}
        />
      ))}

    </div>
  );
};