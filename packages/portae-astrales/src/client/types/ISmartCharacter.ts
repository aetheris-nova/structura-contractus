import type { SmartAssemblies, SmartAssemblyType, SmartCharacter } from '@eveworld/types';

interface ISmartCharacter extends Omit<SmartCharacter, 'smartAssemblies'> {
  smartAssemblies: SmartAssemblyType<SmartAssemblies>[];
}

export default ISmartCharacter;
