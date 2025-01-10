// types
import type { TActionCreator } from '@client/types';

const resetProvidersAction: TActionCreator =
  ({ setState }) =>
  () =>
    setState((state) => ({
      ...state,
      providers: [],
    }));

export default resetProvidersAction;
