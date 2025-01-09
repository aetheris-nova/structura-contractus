import { type FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

// types
import type { IParams } from './types';

// utils
import useStore from '@client/utils/useStore';

const TerminalPage: FC = () => {
  const { t } = useTranslation();
  const { id } = useParams() as Readonly<IParams>;
  const { setSubtitle, setTitle } = useStore();

  useEffect(() => {
    setTitle(t('titles.page', { context: 'terminal' }));
  }, []);
  useEffect(() => {
    id && setSubtitle(id);
  }, [id]);

  return (
    <div>Hello Human</div>
  );
};

export default TerminalPage;
