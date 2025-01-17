import type { SmartAssemblies } from '@eveworld/types';
import type { AxiosError } from 'axios';

// constants
import { FETCH_SMART_ASSEMBLY_DELAY } from '@client/constants';

// errors
import UnknownError from '@client/errors/UnknownError';

// types
import type { TActionCreator, TSmartAssemblyWithAdditionalModules } from '@client/types';

// utils
import fetchSmartAssemblyByID from '@client/utils/fetchSmartAssemblyByID';

const fetchSmartAssemblyAction: TActionCreator<
  string,
  Promise<TSmartAssemblyWithAdditionalModules<SmartAssemblies> | null>
> =
  ({ getState, setState }) =>
  async (id) => {
    const __function = 'fetchSmartAssemblyAction';
    const fetching = getState().fetchingSmartAssembly;
    const logger = getState().logger;
    let result: TSmartAssemblyWithAdditionalModules<SmartAssemblies>;

    if (fetching) {
      return null;
    }

    setState((state) => ({
      ...state,
      fetchingSmartAssembly: true,
    }));

    try {
      result = await fetchSmartAssemblyByID(id);
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

    // if we have smart gates, we need to get the locations for each gate too as they don't come with it
    if (result.assemblyType === 'SmartGate') {
      result.gateLink.gatesInRange = await Promise.all(
        result.gateLink.gatesInRange.map(async (value, index) => {
          try {
            const { location } = await fetchSmartAssemblyByID<'SmartGate'>(value.id, {
              delay: index * FETCH_SMART_ASSEMBLY_DELAY,
            });

            return {
              ...value,
              location,
            };
          } catch (error) {
            logger.error(`${__function}: failed to get location for gate "${value.id}", ignoring`, error);

            return value;
          }
        })
      );
    }

    logger.debug(`${__function}: found smart assembly:`, result);

    setState((state) => ({
      ...state,
      fetchingSmartAssembly: false,
      smartAssembly: result,
    }));

    return result;
  };

export default fetchSmartAssemblyAction;
