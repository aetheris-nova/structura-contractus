// actions
import setAccountsAction from './actions/setAccountsAction';

// types
import type { TStateCreator } from '@client/types';
import type { ISlice } from './types';

const createAccountSlice: TStateCreator<ISlice> = (setState, getState) => {
  const api = { getState, setState };

  return {
    accounts: [],
    fetchingAccounts: false,
    selectedAccountAddress: null,
    // setters
    setAccountsAction: setAccountsAction(api),
  };
};

export default createAccountSlice;
