import type { SmartAssemblies } from '@eveworld/types';

// types
import type TSmartAssemblyWithAdditionalModules from './TSmartAssemblyWithAdditionalModules';
import type TWithLastUpdatedAt from '../system/TWithLastUpdatedAt';

type TSmartAssemblyWithExtendedProps<Type extends SmartAssemblies> = TWithLastUpdatedAt<
  TSmartAssemblyWithAdditionalModules<Type>
>;

export default TSmartAssemblyWithExtendedProps;
