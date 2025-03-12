import type { ISmartAssembly } from '@aetherisnova/types';

// types
import type { IModalProps } from '@client/types';

interface IProps extends IModalProps {
  smartAssembly: ISmartAssembly;
}

export default IProps;
