export type Player = "X" | "O";
export type BoardValue = Player | null;
export type BoardState = BoardValue[];

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const createEmptyBoard = (): BoardState => {
  return Array(9).fill(null);
};

export const getWinner = (board: BoardState): Player | null => {
  for (const [a, b, c] of WINNING_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
};

export const checkDraw = (board: BoardState): boolean => {
  return board.every(Boolean) && getWinner(board) === null;
};
