import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

// components
import Page from '@client/components/Page';

// types
import type { IParams } from './types';

const GatePage: FC = () => {
  const { t } = useTranslation();
  const { id } = useParams() as Readonly<IParams>;

  return (
    <Page subtitle={id} title={t('titles.page', { context: 'gate' })}>
      <div>Hello Human</div>
    </Page>
  );
};

export default GatePage;
