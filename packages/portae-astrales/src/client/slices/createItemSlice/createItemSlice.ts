// actions
import fetchItemAction from './actions/fetchItemAction';

// types
import type { TStateCreator } from '@client/types';
import type { ISlice } from './types';

const createItemSlice: TStateCreator<ISlice> = (setState, getState) => {
  const api = { getState, setState };

  return {
    // state
    items: [],
    fetchingItems: [],
    // actions
    fetchItemAction: fetchItemAction(api),
  };
};

export default createItemSlice;
