import { BoardState } from "../types/game.types";

export const createEmptyBoard = (): BoardState => {
  return Array(9).fill(null);
};

export const checkSquareAvailability = (
  board: BoardState,
  position: number
): boolean => {
  return board[position] === null;
};