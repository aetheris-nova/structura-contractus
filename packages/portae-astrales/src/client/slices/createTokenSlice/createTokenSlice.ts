// actions
import fetchERC20TokenAction from './actions/fetchERC20TokenAction';

// types
import type { TStateCreator } from '@client/types';
import type { ISlice } from './types';

const createTokenSlice: TStateCreator<ISlice> = (setState, getState) => {
  const api = { getState, setState };

  return {
    // state
    tokens: [],
    fetchingTokens: [],
    // actions
    fetchERC20TokenAction: fetchERC20TokenAction(api),
  };
};

export default createTokenSlice;
