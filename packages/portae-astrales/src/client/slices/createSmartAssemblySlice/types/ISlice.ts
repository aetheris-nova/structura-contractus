import type { SmartAssemblies } from '@eveworld/types';

// types
import type { IWorldInteractionOptions, TSmartAssemblyWithExtendedProps } from '@client/types';
import type { IOptions as ISetSmartAssemblyMetadataActionOptions } from '../actions/setSmartAssemblyMetadataAction';

interface ISlice {
  // state
  smartAssembly: TSmartAssemblyWithExtendedProps<SmartAssemblies> | null;
  smartAssemblyPollingInterval: number | null;
  fetchingSmartAssembly: boolean;
  // actions
  fetchSmartAssemblyAction: (id: string) => Promise<TSmartAssemblyWithExtendedProps<SmartAssemblies> | null>;
  setSmartAssemblyMetadataAction: (options: ISetSmartAssemblyMetadataActionOptions) => Promise<boolean>;
  startPollingForSmartAssemblyAction: (payload?: undefined) => void;
  stopPollingForSmartAssemblyAction: (payload?: undefined) => void;
  toggleSmartAssemblyOnlineAction: (options: IWorldInteractionOptions) => Promise<boolean>;
}

export default ISlice;
