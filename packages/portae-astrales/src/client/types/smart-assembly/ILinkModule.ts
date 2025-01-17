import type { LinkModule } from '@eveworld/types/types';

// types
import type ISmartAssembly from './ISmartAssembly';

interface ILinkModule extends Omit<LinkModule, 'gatesInRange'> {
  gatesInRange: ISmartAssembly[];
}

export default ILinkModule;
