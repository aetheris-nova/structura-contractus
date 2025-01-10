// actions
import addProviderAction from './actions/addProviderAction';
import resetProvidersAction from './actions/resetProvidersAction';

// types
import type { TStateCreator } from '@client/types';
import type { ISlice } from './types';

const createProviderSlice: TStateCreator<ISlice> = (setState, getState) => {
  const api = { getState, setState };

  return {
    providers: [],
    // setters
    addProviderAction: addProviderAction(api),
    resetProvidersAction: resetProvidersAction(api),
  };
};

export default createProviderSlice;
