import type { SmartAssemblies } from '@eveworld/types';

// types
import type { IWorldInteractionOptions, TSmartAssemblyWithAdditionalModules } from '@client/types';
import type { IOptions as ISetSmartAssemblyMetadataActionOptions } from '../actions/setSmartAssemblyMetadataAction';

interface ISlice {
  // state
  smartAssembly: TSmartAssemblyWithAdditionalModules<SmartAssemblies> | null;
  fetchingSmartAssembly: boolean;
  // actions
  fetchSmartAssemblyAction: (id: string) => Promise<TSmartAssemblyWithAdditionalModules<SmartAssemblies> | null>;
  setSmartAssemblyMetadataAction: (options: ISetSmartAssemblyMetadataActionOptions) => Promise<boolean>;
  toggleSmartAssemblyOnlineAction: (options: IWorldInteractionOptions) => Promise<boolean>;
}

export default ISlice;
