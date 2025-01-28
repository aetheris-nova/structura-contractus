import type { SmartAssemblies, SmartAssembly } from '@eveworld/types';

// types
import type ILocation from './ILocation';

interface ISmartAssembly extends Omit<SmartAssembly, 'locationX' | 'locationY' | 'locationZ'> {
  assemblyType: SmartAssemblies;
  location: ILocation;
}

export default ISmartAssembly;
