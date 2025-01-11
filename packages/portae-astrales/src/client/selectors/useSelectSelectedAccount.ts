// types
import type { ISmartCharacterWithTimestamp } from '@client/types';

// utils
import useStore from '@client/utils/useStore';

export default function useSelectSelectedAccount(): ISmartCharacterWithTimestamp | null {
  return useStore((state) => state.accounts.find(({ address }) => address === state.selectedAccountAddress) || null);
}
