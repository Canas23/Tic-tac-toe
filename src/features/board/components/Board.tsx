import { Square } from "./Square";
import { checkSquareAvailability } from "../helpers/boardHelpers";

interface BoardProps {
  board: (string | null)[];
  currentPlayer: string;
  onPlay: (position: number, player: string) => void;
}

export const Board = ({
  board,
  currentPlayer,
  onPlay,
}: BoardProps) => {

  const handleSquareClick = (position: number) => {

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