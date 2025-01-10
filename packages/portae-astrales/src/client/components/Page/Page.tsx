import { type FC, type PropsWithChildren, useEffect } from 'react';

// types
import type { IProps } from './types';

// utils
import useStore from '@client/utils/useStore';

const Page: FC<PropsWithChildren<IProps>> = ({ children, title, subtitle }) => {
  const { setSubtitle, setTitle } = useStore();

  useEffect(() => setTitle(title ?? null), []);
  useEffect(() => setSubtitle(subtitle ?? null), []);

  return children;
};

export default Page;
