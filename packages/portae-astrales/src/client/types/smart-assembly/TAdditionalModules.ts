import type { SmartAssemblies } from '@eveworld/types';
import type { InventoryModule, ProximityModule } from '@eveworld/types/types';

// types
import type ILinkModule from './ILinkModule';

type TAdditionalModules<Type extends SmartAssemblies> = Type extends 'SmartStorageUnit'
  ? {
      assemblyType: Type;
      inventory: InventoryModule;
    }
  : Type extends 'SmartTurret'
    ? {
        assemblyType: Type;
        proximity: ProximityModule;
      }
    : Type extends 'SmartGate'
      ? {
          assemblyType: Type;
          gateLink: ILinkModule;
        }
      : never;

export default TAdditionalModules;
