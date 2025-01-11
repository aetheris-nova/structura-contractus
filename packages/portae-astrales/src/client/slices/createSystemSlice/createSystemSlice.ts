// actions
import setInGameAction from './actions/setInGameAction';

// types
import type { TStateCreator } from '@client/types';
import type { ISlice } from './types';

// utils
import createLogger from '@client/utils/createLogger';

const createSystemSlice: TStateCreator<ISlice> = (setState, getState) => {
  const api = { getState, setState };

  return {
    // state
    inGame: false,
    logger: createLogger(import.meta.env.DEV ? 'debug' : 'error'),
    // actions
    setInGame: setInGameAction(api),
  };
};

export default createSystemSlice;
