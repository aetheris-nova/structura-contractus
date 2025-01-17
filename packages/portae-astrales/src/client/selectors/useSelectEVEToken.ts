// types
import type { IERC20Token } from '@client/types';

// utils
import useStore from '@client/utils/useStore';

export default function useSelectEVEToken(): IERC20Token | null {
  return useStore(({ tokens, worldConfig }) => {
    if (!worldConfig) {
      return null;
    }

    return tokens.find(({ address }) => address === worldConfig.contracts.eveToken.address) || null;
  });
}
