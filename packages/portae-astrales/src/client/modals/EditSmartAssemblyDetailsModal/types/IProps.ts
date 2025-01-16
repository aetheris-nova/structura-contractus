import type { SmartAssembly } from '@eveworld/types';

// types
import type { IModalProps } from '@client/types';

interface IProps extends IModalProps {
  smartAssembly: SmartAssembly;
}

export default IProps;
