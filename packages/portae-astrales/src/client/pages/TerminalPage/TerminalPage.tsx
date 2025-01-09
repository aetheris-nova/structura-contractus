import type { FC } from 'react';
import { useParams } from 'react-router-dom';

// types
import type { IParams } from './types';

const TerminalPage: FC = () => {
  const { id } = useParams() as Readonly<IParams>;

  return (
    <div>Hello Human</div>
  );
};

export default TerminalPage;
