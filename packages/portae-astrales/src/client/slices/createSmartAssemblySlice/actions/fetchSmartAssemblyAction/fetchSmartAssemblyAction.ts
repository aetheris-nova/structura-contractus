import type { SmartAssemblies, SmartAssemblyType } from '@eveworld/types';
import axios, { type AxiosError, AxiosResponse } from 'axios';

// errors
import UnknownError from '@client/errors/UnknownError';

// types
import type { TActionCreator } from '@client/types';

const fetchSmartAssemblyAction: TActionCreator<string, Promise<SmartAssemblyType<SmartAssemblies> | null>> =
  ({ getState, setState }) =>
  async (id) => {
    const __function = 'fetchSmartAssemblyAction';
    const fetching = getState().fetchingSmartAssembly;
    const logger = getState().logger;
    let response: AxiosResponse<SmartAssemblyType<SmartAssemblies>>;

    if (fetching) {
      return null;
    }

    setState((state) => ({
      ...state,
      fetchingSmartAssembly: true,
    }));

    try {
      response = await axios.get(`${import.meta.env.VITE_WORLD_API_HTTP_URL}/smartassemblies/${id}`);

      logger.debug(`${__function}: found smart assembly:`, response.data);

      setState((state) => ({
        ...state,
        fetchingSmartAssembly: false,
        smartAssembly: response.data,
      }));

      return response.data;
    } catch (error) {
      logger.error(`${__function}: `, error);

      if ((error as AxiosError).isAxiosError) {
        if ((error as AxiosError).status === 404) {
          setState((state) => ({
            ...state,
            fetchingSmartAssembly: false,
          }));

          return null;
        }
      }

      setState((state) => ({
        ...state,
        error: new UnknownError(error.message),
        fetchingSmartAssembly: false,
      }));

      return null;
    }
  };

export default fetchSmartAssemblyAction;
