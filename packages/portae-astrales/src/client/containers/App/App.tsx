import { AppProvider, useCheckInGame } from '@aetherisnova/ui-components';
import { type FC, useEffect, useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { type Chain, http } from 'viem';
import { createConfig } from 'wagmi';

// constants
import { CHARACTER_ROUTE, SMART_ASSEMBLY_ROUTE } from '@client/constants';

// containers
import Root from '@client/containers/Root';

// pages
import CharacterPage from '@client/pages/CharacterPage';
import SmartAssemblyPage from '@client/pages/SmartAssemblyPage';
import WelcomePage from '@client/pages/WelcomePage';

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
  const router = useMemo(() => createBrowserRouter([
    {
      children: [
        {
          element: <WelcomePage />,
          path: '/',
        },
        {
          element: <CharacterPage />,
          path: CHARACTER_ROUTE,
        },
        {
          element: <SmartAssemblyPage />,
          path: `${SMART_ASSEMBLY_ROUTE}/:id`,
        },
      ],
      element: <Root />,
      path: '/',
    },
  ]), []);
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
      <RouterProvider router={router} />
    </AppProvider>
  );
};

export default App;
