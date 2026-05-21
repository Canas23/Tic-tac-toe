
import "./board.css";

interface Props {
  value: string | null;
  onClick: () => void;
}


const Square = ({ value, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`square ${value === "X" ? "x-player" : ""} ${
        value === "O" ? "o-player" : ""
      }`}
    >
      {value}
    </button>
  );
};

export default Square;