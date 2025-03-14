import { UnknownError } from '@aetherisnova/errors';
import type { TSmartAssemblyWithAdditionalModules, TSmartAssemblyWithExtendedProps } from '@aetherisnova/types';
import { fetchSmartAssemblyByID } from '@aetherisnova/utils';
import type { SmartAssemblies } from '@eveworld/types';
import type { AxiosError } from 'axios';

// constants
import { FETCH_SMART_ASSEMBLY_DELAY } from '@client/constants';

// types
import type { TActionCreator } from '@client/types';

const fetchSmartAssemblyAction: TActionCreator<
  string,
  Promise<TSmartAssemblyWithExtendedProps<SmartAssemblies> | null>
> =
  ({ getState, setState }) =>
  async (id) => {
    const __function = 'fetchSmartAssemblyAction';
    const fetching = getState().fetchingSmartAssembly;
    const logger = getState().logger;
    let result: TSmartAssemblyWithAdditionalModules<SmartAssemblies> | null;
    let smartAssembly: TSmartAssemblyWithExtendedProps<SmartAssemblies>;

    if (fetching) {
      return null;
    }

    setState((state) => ({
      ...state,
      fetchingSmartAssembly: true,
    }));

    try {
      result = await fetchSmartAssemblyByID(import.meta.env.VITE_WORLD_API_HTTP_URL, id);
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

    if (!result) {
      return null;
    }

    // if we have smart gates, we need to get the locations for each gate too as they don't come with it
    if (result.assemblyType === 'SmartGate') {
      result.gateLink = {
        ...result.gateLink,
        gatesInRange: result.gateLink
          ? await Promise.all(
              result.gateLink.gatesInRange.map(async (value, index) => {
                try {
                  const _result = await fetchSmartAssemblyByID<'SmartGate'>(
                    import.meta.env.VITE_WORLD_API_HTTP_URL,
                    value.id,
                    {
                      delay: index * FETCH_SMART_ASSEMBLY_DELAY,
                    }
                  );

                  if (!_result) {
                    return value;
                  }

                  return {
                    ...value,
                    location: _result.location,
                  };
                } catch (error) {
                  logger.error(`${__function}: failed to get location for gate "${value.id}", ignoring`, error);

                  return value;
                }
              })
            )
          : [],
      };
    }

    smartAssembly = {
      ...result,
      lastUpdatedAt: new Date().getTime(),
    };

    setState((state) => ({
      ...state,
      fetchingSmartAssembly: false,
      smartAssembly,
    }));

    logger.debug(`${__function}: saved smart assembly:`, smartAssembly);

    return smartAssembly;
  };

export default fetchSmartAssemblyAction;
