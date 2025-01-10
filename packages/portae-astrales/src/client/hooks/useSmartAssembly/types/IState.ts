import type { SmartAssemblies, SmartAssemblyType } from '@eveworld/types';

// errors
import BaseError from '@client/errors/BaseError';

interface IState<Type extends SmartAssemblies> {
  error: BaseError | null;
  fetching: boolean;
  fetchSmartAssemblyAction: (id: string) => Promise<void>;
  smartAssembly: SmartAssemblyType<Type> | null;
}

export default IState;
