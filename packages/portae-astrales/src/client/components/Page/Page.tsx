import { type FC, type PropsWithChildren, useEffect } from 'react';

// types
import type { IProps } from './types';

// utils
import useStore from '@client/utils/useStore';

const Page: FC<PropsWithChildren<IProps>> = ({ children, title, subtitle }) => {
  const { setSubtitleAction, setTitleAction } = useStore();

  useEffect(() => setTitleAction(title ?? null), []);
  useEffect(() => setSubtitleAction(subtitle ?? null), []);

  return children;
};

export default Page;
