import type { EIP6963ProviderDetail } from '@eveworld/types';

// types
import type { TActionCreator } from '@client/types';

const addProviderAction: TActionCreator<EIP6963ProviderDetail> =
  ({ setState }) =>
  (provider) =>
    setState((state) => {
      // if the provider exists, replace it
      if (state.providers.find((value) => value.info.uuid === provider.info.uuid)) {
        return {
          ...state,
          providers: state.providers.map((value) => (value.info.uuid === provider.info.uuid ? provider : value)),
        };
      }

      return {
        ...state,
        providers: [...state.providers, provider],
      };
    });

export default addProviderAction;
