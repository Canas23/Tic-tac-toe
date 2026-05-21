import { type Player } from "../../board/helpers/boardHelpers";
import { type PlayerNames } from "../../players/data/playerTypes";

export interface MatchRecord {
  id: string;
  players: PlayerNames;
  result: Player | "draw";
  finishedAt: string;
}

export const createMatchRecord = (
  players: PlayerNames,
  winner: Player | null
): MatchRecord => {
  return {
    id: crypto.randomUUID(),
    players,
    result: winner ?? "draw",
    finishedAt: new Date().toLocaleString("es-CO", {
      dateStyle: "short",
      timeStyle: "short",
    }),
  };
};
