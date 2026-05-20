import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div>
      <h1>Tic Tac Toe</h1>

      <Link to="/game">
        <button>Start Game</button>
      </Link>
    </div>
  );
};
