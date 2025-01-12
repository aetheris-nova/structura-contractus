import { formatUnits } from 'viem';

// selectors
import useSelectSelectedAccount from './useSelectSelectedAccount';

// utils
import useStore from '@client/utils/useStore';

export default function useSelectGasBalanceInStandardForm(): string {
  const selectedAccount = useSelectSelectedAccount();
  const { worldConfig } = useStore();

  if (!selectedAccount || !worldConfig) {
    return '0.00';
  }

  return formatUnits(BigInt(selectedAccount.gasBalanceWei), worldConfig.nativeCurrency.decimals);
}
