import "./Board.css";

export const Square = ({ value, onSelect }) => {
  return (
    <button
      className="square"
      onClick={onSelect}
    >
      {value}
    </button>
  );
};