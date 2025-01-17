// errors
import BaseError from '@client/errors/BaseError';

// types
import type { TActionCreator } from '@client/types';

const setErrorAction: TActionCreator<BaseError | null> =
  ({ setState }) =>
  (error) =>
    setState((state) => ({
      ...state,
      error,
    }));

export default setErrorAction;
