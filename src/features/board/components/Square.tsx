import "./Board.css";

interface SquareProps {
  value: string | null;
  onSelect: () => void;
}

export const Square = ({
  value,
  onSelect,
}: SquareProps) => {
  return (
    <button
      className="square"
      onClick={onSelect}
    >
      {value}
    </button>
  );
};