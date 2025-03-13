import { type FC, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import type { Address } from 'viem';
import { useAccount } from 'wagmi';

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
  const {
    error,
    loadingModalDetails,
    setAccountsAction,
    setErrorAction,
    subtitle,
    title,
  } = useStore();
  // handlers
  const handleOnErrorModalClose = () => setErrorAction(null);

  useEffect(() => {
    (async () => addresses && await setAccountsAction(addresses as Address[]))();
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
        title={loadingModalDetails?.title || t('headings.loading')}
      />

      <Layout>
        <Outlet />
      </Layout>
    </>
  );
};

export default Root;
