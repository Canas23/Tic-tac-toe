import { createContext } from "react";
import { type BoardState, type Player } from "../../board/helpers/boardHelpers";

export interface GameContextValue {
  board: BoardState;
  currentPlayer: Player;
  winner: Player | null;
  isDraw: boolean;
  isGameOver: boolean;
  playTurn: (position: number) => void;
  resetGame: () => void;
}

export const GameContext = createContext<GameContextValue | null>(null);
