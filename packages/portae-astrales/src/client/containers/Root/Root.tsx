import { type FC, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import { useAccount, useConfig } from 'wagmi';

// components
import Layout from '@client/components/Layout';

// hooks
import useOnAnnounceProvider from '@client/hooks/useOnAnnounceProvider';

// utils
import useStore from '@client/utils/useStore';

const Root: FC = () => {
  const { t } = useTranslation();
  const { addresses } = useAccount();
  const config = useConfig();
  const { fetchingAccounts, fetchERC20TokenAction, fetchWorldConfigAction, setAccountsAction, subtitle, title } = useStore();

  useOnAnnounceProvider();
  useEffect(() => {
    (async () => {
      const worldConfig = await fetchWorldConfigAction();

      // fetch the eve token details
      await fetchERC20TokenAction({
        address: worldConfig.contracts.eveToken.address,
        config,
      });
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

      <Layout>
        <Outlet />
      </Layout>
    </>
  );
};

export default Root;
