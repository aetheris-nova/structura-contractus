// types
import type { TStateCreator } from '@client/types';
import type { ISlice } from './types';

const createLayoutSlice: TStateCreator<ISlice> = (setState) => ({
  colorMode: 'light',
  subtitle: null,
  title: null,
  // setters
  setColorMode: (colorMode) =>
    setState((state) => ({
      ...state,
      colorMode,
    })),
  setSubtitle: (subtitle) =>
    setState((state) => ({
      ...state,
      subtitle,
    })),
  setTitle: (title) =>
    setState((state) => ({
      ...state,
      title,
    })),
});

export default createLayoutSlice;
