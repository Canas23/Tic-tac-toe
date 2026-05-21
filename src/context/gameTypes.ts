export type Player = "X" | "O";

export type SquareValue = Player | null;

export interface GameState {
  board: SquareValue[];
  currentPlayer: Player;
  winner: Player | null;
  isDraw: boolean;
}