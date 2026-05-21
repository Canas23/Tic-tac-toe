import { createContext } from "react";
import { type GameState } from "./gameTypes";

interface GameContextProps {
  state: GameState;
  playMove: (index: number) => void;
  restartGame: () => void;
}

export const GameContext =
  createContext<GameContextProps | null>(null);