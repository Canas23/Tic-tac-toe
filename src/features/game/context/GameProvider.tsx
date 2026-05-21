import { useCallback, useMemo, useState, type ReactNode } from "react";
import {
  checkDraw,
  createEmptyBoard,
  getWinner,
  type BoardState,
  type Player,
} from "../../board/helpers/boardHelpers";
import { GameContext } from "./GameContext";

const getNextPlayer = (player: Player): Player => {
  return player === "X" ? "O" : "X";
};

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [board, setBoard] = useState<BoardState>(createEmptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");

  const winner = getWinner(board);
  const isDraw = checkDraw(board);
  const isGameOver = winner !== null || isDraw;

  const playTurn = useCallback(
    (position: number) => {
      if (board[position] !== null || isGameOver) {
        return;
      }

      const nextBoard = [...board];
      nextBoard[position] = currentPlayer;

      setBoard(nextBoard);

      if (!getWinner(nextBoard) && !checkDraw(nextBoard)) {
        setCurrentPlayer(getNextPlayer(currentPlayer));
      }
    },
    [board, currentPlayer, isGameOver]
  );

  const resetGame = useCallback(() => {
    setBoard(createEmptyBoard());
    setCurrentPlayer("X");
  }, []);

  const value = useMemo(
    () => ({
      board,
      currentPlayer,
      winner,
      isDraw,
      isGameOver,
      playTurn,
      resetGame,
    }),
    [board, currentPlayer, isDraw, isGameOver, playTurn, resetGame, winner]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
