// types
import type { TActionCreator } from '@client/types';

const stopPollingForSmartAssemblyAction: TActionCreator<undefined, void> =
  ({ getState, setState }) =>
  () => {
    const interval = getState().smartAssemblyPollingInterval;

    interval && window.clearInterval(interval);

    setState((state) => ({
      ...state,
      smartAssemblyPollingInterval: null,
    }));
  };

export default stopPollingForSmartAssemblyAction;
