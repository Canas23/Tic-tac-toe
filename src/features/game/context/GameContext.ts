import { createContext } from "react";
import { type BoardState, type Player } from "../../board/helpers/boardHelpers";
import { type MatchRecord } from "../services/matchHistoryService";
import { type PlayerNames } from "../../players/data/playerTypes";

export interface GameContextValue {
  board: BoardState;
  currentPlayer: Player;
  winner: Player | null;
  isDraw: boolean;
  isGameOver: boolean;
  players: PlayerNames;
  history: MatchRecord[];
  getPlayerName: (player: Player) => string;
  playMove: (position: number) => void;
  restartGame: () => void;
  startGame: (playerOneName: string, playerTwoName: string) => void;
  recordFinishedGame: () => void;
}

export const GameContext = createContext<GameContextValue | null>(null);
