import type { TSmartCharacterWithExtendedProps } from '@client/types';

interface ISlice {
  // state
  accounts: TSmartCharacterWithExtendedProps[];
  fetchingAccounts: boolean;
  selectedAccountAddress: string | null;
  // actions
  setAccountsAction: (addresses: string[]) => Promise<TSmartCharacterWithExtendedProps[]>;
}

export default ISlice;
