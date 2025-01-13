import type { SmartAssemblies, SmartAssemblyType } from '@eveworld/types';
import axios, { type AxiosError, type AxiosResponse } from 'axios';
import { useState } from 'react';

// errors
import BaseError from '@client/errors/BaseError';
import SmartAssemblyNotFoundError from '@client/errors/SmartAssemblyNotFoundError';
import UnknownError from '@client/errors/UnknownError';

// selectors
import { useSelectLogger } from '@client/selectors';

// types
import type { IState } from './types';

export default function useSmartAssembly<Type extends SmartAssemblies>(): IState<Type> {
  const __hookName = 'useSmartAssembly';
  // selectors
  const logger = useSelectLogger();
  // states
  const [error, setError] = useState<BaseError | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const [smartAssembly, setSmartAssembly] = useState<SmartAssemblyType<Type> | null>(null);
  // actions
  const fetchSmartAssemblyAction = async (id: string) => {
    let response: AxiosResponse<SmartAssemblyType<Type>>;

    if (fetching) {
      return;
    }

    setFetching(true);
    setError(null);

    try {
      response = await axios.get(`${import.meta.env.VITE_WORLD_API_URL}/smartassemblies/${id}`);

      logger.debug(`${__hookName}: found smart assembly:`, response.data);

      setSmartAssembly(response.data);
      setFetching(false);
    } catch (error) {
      logger.error(`${__hookName}: `, error);

      if ((error as AxiosError).isAxiosError) {
        if ((error as AxiosError).status === 404) {
          setError(
            new SmartAssemblyNotFoundError({
              id,
              message: 'smart assembly not found',
            })
          );
          setFetching(false);

          return;
        }
      }

      setError(new UnknownError(error.message));
      setFetching(false);
    }
  };

  return {
    error,
    fetching,
    fetchSmartAssemblyAction,
    smartAssembly,
  };
}
