import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
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
import { useAuth } from "../../../auth/hooks/useAuth";
import { db } from "../../../utils/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const getNextPlayer = (player: Player): Player => {
  return player === "X" ? "O" : "X";
};

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [board, setBoard] = useState<BoardState>(createEmptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [players, setPlayers] = useState<PlayerNames>(defaultPlayers);
  const [history, setHistory] = useState<MatchRecord[]>([]);
  const [hasRecordedResult, setHasRecordedResult] = useState(false);
  const { user } = useAuth();

  const winner = getWinner(board);
  const isDraw = checkDraw(board);
  const isGameOver = winner !== null || isDraw;

  // Cargar historial del usuario desde Firestore al iniciar sesión
  useEffect(() => {
    if (!user) {
      setHistory([]);
      return;
    }

    const loadHistory = async () => {
      try {
        const q = query(
          collection(db, "matches"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const loadedHistory: (MatchRecord & { createdAt?: string })[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          loadedHistory.push({
            id: data.id || doc.id,
            players: data.players,
            result: data.result,
            finishedAt: data.finishedAt,
            createdAt: data.createdAt,
          });
        });

        // Ordenar en memoria por fecha de creación (descendente)
        loadedHistory.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });

        setHistory(loadedHistory);
      } catch (e) {
        console.error("Error al cargar historial desde Firestore:", e);
      }
    };

    loadHistory();
  }, [user]);

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

  const recordFinishedGame = useCallback(async () => {
    if (!isGameOver || hasRecordedResult || !user) {
      return;
    }

    const record = createMatchRecord(players, winner);
    const documentToSave = {
      ...record,
      userId: user.uid,
      createdAt: new Date().toISOString(),
    };

    // Registrar en Firestore
    try {
      await addDoc(collection(db, "matches"), documentToSave);
      setHistory((currentHistory) => [record, ...currentHistory]);
      setHasRecordedResult(true);
    } catch (e) {
      console.error("Error al guardar partida en Firestore:", e);
      // Fallback: guardar localmente aunque falle Firestore
      setHistory((currentHistory) => [record, ...currentHistory]);
      setHasRecordedResult(true);
    }
  }, [hasRecordedResult, isGameOver, players, winner, user]);

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
