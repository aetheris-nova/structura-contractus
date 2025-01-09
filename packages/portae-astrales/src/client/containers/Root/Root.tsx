import type { FC } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

// components
import Layout from '@client/components/Layout';

// utils
import useStore from '@client/utils/useStore';

const Root: FC = () => {
  const { t } = useTranslation();
  const { subtitle, title } = useStore();

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
