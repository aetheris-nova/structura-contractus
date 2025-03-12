import type { TSmartAssemblyWithAdditionalModules, TSmartCharacterWithExtendedProps } from '@aetherisnova/types';
import type { SmartAssemblies } from '@eveworld/types';

interface IContentProps<Type extends SmartAssemblies> {
  account: TSmartCharacterWithExtendedProps | null;
  onEditMetadataClick: () => void | Promise<void>;
  onToggleOnlineClick: () => void | Promise<void>;
  smartAssembly: TSmartAssemblyWithAdditionalModules<Type>;
}

export default IContentProps;
