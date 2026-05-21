import { type BoardValue } from "../helpers/boardHelpers";

interface Props {
  value: BoardValue;
  disabled: boolean;
  onClick: () => void;
}

const Square = ({ value, disabled, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`square ${value === "X" ? "x-player" : ""} ${
        value === "O" ? "o-player" : ""
      }`}
      aria-label={value ? `Casilla marcada con ${value}` : "Casilla vacia"}
    >
      {value}
    </button>
  );
};

export default Square;
