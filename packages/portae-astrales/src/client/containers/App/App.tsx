import { AppProvider, useCheckInGame } from '@aetherisnova/ui-components';
import { type FC, useEffect, useMemo } from 'react';
import { type Chain, http } from 'viem';
import { createConfig } from 'wagmi';

// containers
import Router from '@client/containers/Router';

// types
import type { IProps } from './types';

// utils
import useStore from '@client/utils/useStore';

const App: FC<IProps> = ({ i18n }) => {
  // selectors
  const {
    fetchERC20TokenAction,
    fetchItemAction,
    fetchWorldConfigAction,
    logger,
    setInGameAction,
    startPollingForSmartCharacterAction,
    stopPollingForSmartCharacterAction,
    worldConfig,
  } = useStore();
  // hooks
  const { inGame } = useCheckInGame({ logger });
  // memos
  const wagmiConfig = useMemo(() => {
    let chain: Chain;

    if (!worldConfig) {
      return null;
    }

    chain = {
      id: worldConfig.chainId,
      name: worldConfig.name,
      nativeCurrency: worldConfig.nativeCurrency,
      rpcUrls: {
        default: {
          http: [worldConfig.rpcUrls.default.http],
        },
      },
      blockExplorers: {
        default: {
          name: 'EVE Frontier Explorer',
          url: worldConfig.blockExplorerUrl,
        },
      },
    };

    return createConfig({
      chains: [chain],
      transports: {
        [chain.id]: http(),
      },
    })
  }, [worldConfig]);

  useEffect(() => {
    (async () => {
      const _worldConfig = await fetchWorldConfigAction();

      await Promise.all([
        // fetch the fuel details
        fetchItemAction(_worldConfig.itemTypeIDs.fuel.toString()),
      ]);

      // start polling for smart character details
      startPollingForSmartCharacterAction();
    })();

    // stop polling if unmounted
    return () => stopPollingForSmartCharacterAction();
  }, []);
  useEffect(() => {
    if (!worldConfig || !wagmiConfig) {
      return;
    }

    // fetch the eve token details
    (async () => {
      await fetchERC20TokenAction({
        address: worldConfig.contracts.eveToken.address,
        config: wagmiConfig,
      });
    })();
  }, [worldConfig, wagmiConfig]);
  useEffect(() => setInGameAction(inGame), [inGame]);

  return (
    <AppProvider i18n={i18n} {...(wagmiConfig && { wagmiConfig })}>
      <Router />
    </AppProvider>
  );
};

export default App;
