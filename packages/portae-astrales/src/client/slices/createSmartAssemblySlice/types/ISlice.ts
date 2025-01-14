import type { SmartAssemblies, SmartAssemblyType } from '@eveworld/types';

// types
import IWorldInteractionOptions from './IWorldInteractionOptions';

interface ISlice {
  // state
  smartAssembly: SmartAssemblyType<SmartAssemblies> | null;
  fetchingSmartAssembly: boolean;
  // actions
  fetchSmartAssemblyAction: (id: string) => Promise<SmartAssemblyType<SmartAssemblies> | null>;
  toggleSmartAssemblyOnlineAction: (options: IWorldInteractionOptions) => Promise<void>;
}

export default ISlice;
