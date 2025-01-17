import type { SmartAssemblies } from '@eveworld/types';

// types
import type { TSmartAssemblyWithAdditionalModules, TSmartCharacterWithExtendedProps } from '@client/types';

interface IContentProps<Type extends SmartAssemblies> {
  account: TSmartCharacterWithExtendedProps | null;
  onEditMetadataClick: () => void | Promise<void>;
  onToggleOnlineClick: () => void | Promise<void>;
  smartAssembly: TSmartAssemblyWithAdditionalModules<Type>;
}

export default IContentProps;
