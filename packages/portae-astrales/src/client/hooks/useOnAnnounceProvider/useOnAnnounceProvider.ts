import { type EIP6963ProviderDetail, SupportedWallets } from '@eveworld/types';
import { useCallback, useEffect } from 'react';

// types
import type { IState } from './types';

// utils
import useStore from '@client/utils/useStore';

export default function useOnAnnounceProvider(): IState {
  const { logger, setInGame } = useStore();
  // actions
  const requestProvidersAction = useCallback(() => {
    window.dispatchEvent(new CustomEvent('eip6963:requestProvider'));
  }, []);
  // handlers
  const handleOnEIP6963Provider = (event: CustomEvent<EIP6963ProviderDetail>) => {
    const __functionName = 'handleOnEIP6963Provider';

    if (event.detail.info.name !== SupportedWallets.FRONTIER) {
      return;
    }

    logger.debug(`${__functionName}: in-game provider "${event.detail.info.name}" found`);

    setInGame(true);
  };

  useEffect(() => {
    window.addEventListener('eip6963:announceProvider', handleOnEIP6963Provider);

    return () => window.removeEventListener('eip6963:announceProvider', handleOnEIP6963Provider);
  }, []);

  return {
    requestProvidersAction,
  };
}
