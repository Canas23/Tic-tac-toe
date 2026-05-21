import {type ReactNode, useReducer } from "react";

import { GameContext } from "./GameContext";
import {
  gameReducer,
  initialState,
} from "./gameReducer";

import {
  PLAY_MOVE,
  RESTART_GAME,
} from "./gameActions";

interface Props {
  children: ReactNode;
}

export const GameProvider = ({
  children,
}: Props) => {
  const [state, dispatch] = useReducer(
    gameReducer,
    initialState
  );

  const playMove = (index: number) => {
    dispatch({
      type: PLAY_MOVE,
      payload: index,
    });
  };

  const restartGame = () => {
    dispatch({
      type: RESTART_GAME,
    });
  };

  return (
    <GameContext.Provider
      value={{
        state,
        playMove,
        restartGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};