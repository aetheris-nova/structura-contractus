import { useCheckInGame } from '@aetherisnova/ui-components';
import { type FC, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import type { Address } from 'viem';
import { useAccount, useConfig } from 'wagmi';

// components
import Layout from '@client/components/Layout';

// modals
import ErrorModal from '@client/modals/ErrorModal';
import LoadingModal from '@client/modals/LoadingModal';

// utils
import useStore from '@client/utils/useStore';

const Root: FC = () => {
  const { t } = useTranslation();
  const { addresses } = useAccount();
  const config = useConfig();
  const {
    error,
    fetchERC20TokenAction,
    fetchItemAction,
    fetchWorldConfigAction,
    loadingModalDetails,
    logger,
    setAccountsAction,
    setErrorAction,
    setInGameAction,
    startPollingForSmartCharacterAction,
    stopPollingForSmartCharacterAction,
    subtitle,
    title,
  } = useStore();
  // hooks
  const { inGame } = useCheckInGame({ logger });
  // handlers
  const handleOnErrorModalClose = () => setErrorAction(null);

  useEffect(() => {
    (async () => {
      const worldConfig = await fetchWorldConfigAction();

      await Promise.all([
        // fetch the fuel details
        fetchItemAction(worldConfig.itemTypeIDs.fuel.toString()),
        // fetch the eve token details
        fetchERC20TokenAction({
          address: worldConfig.contracts.eveToken.address,
          config,
        }),
      ]);

      // start polling for smart character details
      startPollingForSmartCharacterAction();
    })();

    // stop polling if unmounted
    return () => stopPollingForSmartCharacterAction();
  }, []);
  useEffect(() => {
    (async () => addresses && await setAccountsAction(addresses as Address[]))();
  }, [addresses]);
  useEffect(() => setInGameAction(inGame), [inGame]);

  return (
    <>
      <Helmet>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <title>
          {title ? `${title}${subtitle ? ` - ${subtitle}`: ''}` : 'Portae Astrales'}
        </title>

        <meta
          content={t('captions.description')}
          name="description"
        />
      </Helmet>

      {/*modals*/}
      <ErrorModal error={error} onClose={handleOnErrorModalClose} />
      <LoadingModal
        message={loadingModalDetails?.message || t('captions.pleaseWait')}
        open={!!loadingModalDetails && loadingModalDetails.loading}
        title={loadingModalDetails?.title || t('headings.loading')}
      />

      <Layout>
        <Outlet />
      </Layout>
    </>
  );
};

export default Root;
