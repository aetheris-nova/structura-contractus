import { ColorMode } from '@chakra-ui/color-mode';

// types
import type { TStateCreator } from '@client/types';
import type { ISlice } from './types';

const createLayoutSlice: TStateCreator<ISlice> = (setState) => ({
  colorMode: 'light',
  setColorMode: (value: ColorMode) =>
    setState((state) => ({
      ...state,
      colorMode: value,
    })),
});

export default createLayoutSlice;
