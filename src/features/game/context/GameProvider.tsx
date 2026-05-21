import { useCallback, useMemo, useState, type ReactNode } from "react";
import {
  checkDraw,
  createEmptyBoard,
  getWinner,
  type BoardState,
  type Player,
} from "../../board/helpers/boardHelpers";
import { defaultPlayers, normalizePlayerNames } from "../../players/data/playerDefaults";
import { type PlayerNames } from "../../players/data/playerTypes";
import { type MatchRecord } from "../services/matchHistoryService";
import { createMatchRecord } from "../services/matchHistoryService";
import { GameContext } from "./GameContext";

const getNextPlayer = (player: Player): Player => {
  return player === "X" ? "O" : "X";
};

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [board, setBoard] = useState<BoardState>(createEmptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [players, setPlayers] = useState<PlayerNames>(defaultPlayers);
  const [history, setHistory] = useState<MatchRecord[]>([]);
  const [hasRecordedResult, setHasRecordedResult] = useState(false);

  const winner = getWinner(board);
  const isDraw = checkDraw(board);
  const isGameOver = winner !== null || isDraw;

  const getPlayerName = useCallback(
    (player: Player) => {
      return players[player];
    },
    [players]
  );

  const restartGame = useCallback(() => {
    setBoard(createEmptyBoard());
    setCurrentPlayer("X");
    setHasRecordedResult(false);
  }, []);

  const startGame = useCallback((playerOneName: string, playerTwoName: string) => {
    setPlayers(normalizePlayerNames(playerOneName, playerTwoName));
    setBoard(createEmptyBoard());
    setCurrentPlayer("X");
    setHasRecordedResult(false);
  }, []);

  const playMove = useCallback(
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

  const recordFinishedGame = useCallback(() => {
    if (!isGameOver || hasRecordedResult) {
      return;
    }

    const record = createMatchRecord(players, winner);

    setHistory((currentHistory) => [record, ...currentHistory]);
    setHasRecordedResult(true);
  }, [hasRecordedResult, isGameOver, players, winner]);

  const value = useMemo(
    () => ({
      board,
      currentPlayer,
      winner,
      isDraw,
      isGameOver,
      players,
      history,
      getPlayerName,
      playMove,
      restartGame,
      startGame,
      recordFinishedGame,
    }),
    [
      board,
      currentPlayer,
      getPlayerName,
      history,
      isDraw,
      isGameOver,
      playMove,
      players,
      recordFinishedGame,
      restartGame,
      startGame,
      winner,
    ]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
