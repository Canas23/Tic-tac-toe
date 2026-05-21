import { type PlayerNames } from "./playerTypes";

export const defaultPlayers: PlayerNames = {
  X: "Jugador 1",
  O: "Jugador 2",
};

const normalizePlayerName = (name: string, fallback: string): string => {
  return name.trim() || fallback;
};

export const normalizePlayerNames = (
  playerOneName: string,
  playerTwoName: string
): PlayerNames => {
  return {
    X: normalizePlayerName(playerOneName, defaultPlayers.X),
    O: normalizePlayerName(playerTwoName, defaultPlayers.O),
  };
};
