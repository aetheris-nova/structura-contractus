// types
import type { TActionCreator } from '@client/types';

const setInGameAction: TActionCreator<boolean> =
  ({ setState }) =>
  (inGame) =>
    setState((state) => ({
      ...state,
      inGame,
    }));

export default setInGameAction;
