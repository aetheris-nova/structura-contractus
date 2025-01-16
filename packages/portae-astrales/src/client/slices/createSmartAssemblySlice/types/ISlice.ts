import type { SmartAssemblies, SmartAssemblyType } from '@eveworld/types';

// types
import type { IWorldInteractionOptions } from '@client/types';
import type { IOptions as ISetSmartAssemblyMetadataActionOptions } from '../actions/setSmartAssemblyMetadataAction';

interface ISlice {
  // state
  smartAssembly: SmartAssemblyType<SmartAssemblies> | null;
  fetchingSmartAssembly: boolean;
  // actions
  fetchSmartAssemblyAction: (id: string) => Promise<SmartAssemblyType<SmartAssemblies> | null>;
  setSmartAssemblyMetadataAction: (options: ISetSmartAssemblyMetadataActionOptions) => Promise<void>;
  toggleSmartAssemblyOnlineAction: (options: IWorldInteractionOptions) => Promise<void>;
}

export default ISlice;
