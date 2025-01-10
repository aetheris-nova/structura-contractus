import type { EIP6963ProviderDetail } from '@eveworld/types';

interface ISlice {
  // state
  providers: EIP6963ProviderDetail[];
  // actions
  addProviderAction: (provider: EIP6963ProviderDetail) => void;
  resetProvidersAction: (payload?: undefined) => void;
}

export default ISlice;
