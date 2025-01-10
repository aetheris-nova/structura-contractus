import { type FC, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

// components
import Layout from '@client/components/Layout';

// hooks
import useOnAnnounceProvider from '@client/hooks/useOnAnnounceProvider';

// utils
import useStore from '@client/utils/useStore';

const Root: FC = () => {
  const { t } = useTranslation();
  const { subtitle, title, fetchWorldConfigAction } = useStore();
  // hooks
  const { requestProvidersAction } = useOnAnnounceProvider();

  useEffect(() => {
    (async () => await fetchWorldConfigAction())();
    requestProvidersAction();
  }, []);

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
