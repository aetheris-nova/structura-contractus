import type { ISmartCharacterWithTimestamp } from '@client/types';

interface ISlice {
  // state
  accounts: ISmartCharacterWithTimestamp[];
  fetchingAccounts: boolean;
  selectedAccountAddress: string | null;
  // actions
  setAccountsAction: (addresses: string[]) => Promise<ISmartCharacterWithTimestamp[]>;
}

export default ISlice;
