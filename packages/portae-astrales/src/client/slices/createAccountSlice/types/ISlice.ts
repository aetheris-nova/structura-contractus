import type { Address } from 'viem';

// types
import type { TSmartCharacterWithExtendedProps } from '@client/types';

interface ISlice {
  // state
  accounts: TSmartCharacterWithExtendedProps[];
  fetchingAccounts: Address[];
  selectedAccountAddress: string | null;
  smartCharacterPollingInterval: number | null;
  // actions
  setAccountsAction: (addresses: Address[]) => Promise<TSmartCharacterWithExtendedProps[]>;
  startPollingForSmartCharacterAction: (payload?: undefined) => void;
  stopPollingForSmartCharacterAction: (payload?: undefined) => void;
}

export default ISlice;
