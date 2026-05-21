import {type GameState } from "./gameTypes";
import { PLAY_MOVE, RESTART_GAME } from "./gameActions";

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
];

const calculateWinner = (board: (string | null)[]) => {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;

    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return board[a];
    }
  }

  return null;
};

type Action =
  | {
      type: typeof PLAY_MOVE;
      payload: number;
    }
  | {
      type: typeof RESTART_GAME;
    };

export const initialState: GameState = {
  board: Array(9).fill(null),
  currentPlayer: "X",
  winner: null,
  isDraw: false,
};

export const gameReducer = (
  state: GameState,
  action: Action
): GameState => {
  switch (action.type) {
    case PLAY_MOVE: {
      const index = action.payload;

      // evitar sobrescribir
      if (state.board[index] || state.winner) {
        return state;
      }

      const updatedBoard = [...state.board];

      updatedBoard[index] = state.currentPlayer;

      const winner = calculateWinner(updatedBoard);

      const isDraw =
        !winner && updatedBoard.every((square) => square !== null);

      return {
        ...state,
        board: updatedBoard,
        currentPlayer:
          state.currentPlayer === "X" ? "O" : "X",
        winner,
        isDraw,
      };
    }

    case RESTART_GAME:
      return initialState;

    default:
      return state;
  }
};