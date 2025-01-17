import type { SmartAssemblies } from '@eveworld/types';

// constants
import { FETCH_SMART_ASSEMBLY_TIMEOUT, POLL_SMART_ASSEMBLY_INTERVAL } from '@client/constants';

// types
import type { TActionCreator, TSmartAssemblyWithAdditionalModules } from '@client/types';

// utils
import fetchSmartAssemblyByID from '@client/utils/fetchSmartAssemblyByID';

const startPollingForSmartAssemblyAction: TActionCreator<undefined, Promise<void>> =
  ({ getState, setState }) =>
  async () => {
    const __function = 'startPollingForSmartAssemblyAction';
    const interval = window.setInterval(async () => {
      const fetchingSmartAssembly = getState().fetchingSmartAssembly;
      const logger = getState().logger;
      const now = new Date();
      const smartAssembly = getState().smartAssembly;
      let result: TSmartAssemblyWithAdditionalModules<SmartAssemblies>;

      // skip if the smart assembly is being fetched, there is no smart assembly, or it was updated recently
      if (
        fetchingSmartAssembly ||
        !smartAssembly ||
        now.getTime() < smartAssembly.lastUpdatedAt + FETCH_SMART_ASSEMBLY_TIMEOUT
      ) {
        return;
      }

      setState((state) => ({
        ...state,
        fetchingSmartAssembly: true,
      }));

      try {
        result = await fetchSmartAssemblyByID(smartAssembly.id);
      } catch (error) {
        logger.error(`${__function}:`, error);

        setState((state) => ({
          ...state,
          fetchingSmartAssembly: false,
        }));

        return;
      }

      setState((state) => ({
        ...state,
        smartAssembly: {
          ...result,
          lastUpdatedAt: now.getTime(),
        },
        fetchingSmartAssembly: false,
      }));
    }, POLL_SMART_ASSEMBLY_INTERVAL);

    setState((state) => ({
      ...state,
      smartAssemblyPollingInterval: interval,
    }));
  };

export default startPollingForSmartAssemblyAction;
