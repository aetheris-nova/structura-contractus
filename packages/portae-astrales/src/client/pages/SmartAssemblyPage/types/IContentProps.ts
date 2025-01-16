import type { SmartAssemblies, SmartAssemblyType } from '@eveworld/types';

// types
import type { TSmartCharacterWithExtendedProps } from '@client/types';

interface IContentProps<Type extends SmartAssemblies> {
  account: TSmartCharacterWithExtendedProps | null;
  onEditMetadataClick: () => void | Promise<void>;
  onToggleOnlineClick: () => void | Promise<void>;
  smartAssembly: SmartAssemblyType<Type>;
}

export default IContentProps;
