import { type FC, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import { useAccount, useConfig } from 'wagmi';

// components
import Layout from '@client/components/Layout';

// hooks
import useOnAnnounceProvider from '@client/hooks/useOnAnnounceProvider';

// modals
import ErrorModal from '@client/modals/ErrorModal';
import LoadingModal from '@client/modals/LoadingModal';

// utils
import useStore from '@client/utils/useStore';

const Root: FC = () => {
  const { t } = useTranslation();
  const { addresses } = useAccount();
  const config = useConfig();
  const { error, fetchingAccounts, fetchERC20TokenAction, fetchItemAction, fetchWorldConfigAction, loadingModalDetails, setAccountsAction, setErrorAction, subtitle, title } = useStore();
  // handlers
  const handleOnErrorModalClose = () => setErrorAction(null);

  useOnAnnounceProvider();
  useEffect(() => {
    (async () => {
      const worldConfig = await fetchWorldConfigAction();

      await Promise.all([
        // fetch the salt fuel details
        fetchItemAction(worldConfig.itemTypeIDs.fuel.toString()),
        // fetch the eve token details
        fetchERC20TokenAction({
          address: worldConfig.contracts.eveToken.address,
          config,
        }),
      ]);
    })();
  }, []);
  useEffect(() => {
    if (addresses && !fetchingAccounts) {
      (async () => await setAccountsAction(addresses.map((value) => value)))();
    }
  }, [addresses]);

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
        title={loadingModalDetails?.title || t('captions.loading')}
      />

      <Layout>
        <Outlet />
      </Layout>
    </>
  );
};

export default Root;
