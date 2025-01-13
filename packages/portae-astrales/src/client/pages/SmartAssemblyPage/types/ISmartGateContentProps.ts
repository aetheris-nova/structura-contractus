import type { SmartAssemblyType } from '@eveworld/types';

// types
import type { TSmartCharacterWithExtendedProps } from '@client/types';

interface ISmartGateContentProps {
  account: TSmartCharacterWithExtendedProps | null;
  smartGate: SmartAssemblyType<'SmartGate'>;
}

export default ISmartGateContentProps;
