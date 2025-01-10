// types
import type { TStateCreator } from '@client/types';
import type { ISlice } from './types';

// utils
import createLogger from '@client/utils/createLogger';

const createSystemSlice: TStateCreator<ISlice> = () => ({
  // state
  logger: createLogger(import.meta.env.DEV ? 'debug' : 'error'),
});

export default createSystemSlice;
