import type { SmartAssemblies } from '@eveworld/types';

// types
import type ISmartAssembly from './ISmartAssembly';
import type TAdditionalModules from './TAdditionalModules';

type TSmartAssemblyWithAdditionalModules<Type extends SmartAssemblies> = ISmartAssembly & TAdditionalModules<Type>;

export default TSmartAssemblyWithAdditionalModules;
