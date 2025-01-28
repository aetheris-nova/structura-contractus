// constants
import { FETCH_SMART_ASSEMBLY_TIMEOUT, POLL_SMART_ASSEMBLY_INTERVAL } from '@client/constants';

// types
import type { TActionCreator } from '@client/types';

const startPollingForSmartAssemblyAction: TActionCreator<undefined, Promise<void>> =
  ({ getState, setState }) =>
  async () => {
    const interval = window.setInterval(async () => {
      const fetchingSmartAssembly = getState().fetchingSmartAssembly;
      const fetchSmartAssemblyAction = getState().fetchSmartAssemblyAction;
      const smartAssembly = getState().smartAssembly;

      // skip if the smart assembly is being fetched, there is no smart assembly, or it was updated recently
      if (
        fetchingSmartAssembly ||
        !smartAssembly ||
        new Date().getTime() < smartAssembly.lastUpdatedAt + FETCH_SMART_ASSEMBLY_TIMEOUT
      ) {
        return;
      }

      await fetchSmartAssemblyAction(smartAssembly.id);
    }, POLL_SMART_ASSEMBLY_INTERVAL);

    setState((state) => ({
      ...state,
      smartAssemblyPollingInterval: interval,
    }));
  };

export default startPollingForSmartAssemblyAction;
