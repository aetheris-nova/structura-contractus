// actions
import fetchSmartAssemblyAction from './actions/fetchSmartAssemblyAction';
import toggleSmartAssemblyOnlineAction from './actions/toggleSmartAssemblyOnlineAction';

// types
import type { TStateCreator } from '@client/types';
import type { ISlice } from './types';

const createSmartAssemblySlice: TStateCreator<ISlice> = (setState, getState) => {
  const api = { getState, setState };

  return {
    fetchingSmartAssembly: false,
    smartAssembly: null,
    // setters
    fetchSmartAssemblyAction: fetchSmartAssemblyAction(api),
    toggleSmartAssemblyOnlineAction: toggleSmartAssemblyOnlineAction(api),
  };
};

export default createSmartAssemblySlice;
