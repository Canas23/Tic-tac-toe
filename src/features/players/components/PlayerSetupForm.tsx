import { useState, type FormEvent } from "react";

interface PlayerSetupFormProps {
  onStartGame: (playerOneName: string, playerTwoName: string) => void;
}

export const PlayerSetupForm = ({ onStartGame }: PlayerSetupFormProps) => {
  const [playerOneName, setPlayerOneName] = useState("");
  const [playerTwoName, setPlayerTwoName] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onStartGame(playerOneName, playerTwoName);
  };

  return (
    <form className="player-form" onSubmit={handleSubmit}>
      <label>
        Jugador 1 (X)
        <input
          value={playerOneName}
          onChange={(event) => setPlayerOneName(event.target.value)}
          placeholder="Jugador 1"
        />
      </label>

      <label>
        Jugador 2 (O)
        <input
          value={playerTwoName}
          onChange={(event) => setPlayerTwoName(event.target.value)}
          placeholder="Jugador 2"
        />
      </label>

      <button className="button button--primary" type="submit">
        Iniciar juego
      </button>
    </form>
  );
};
