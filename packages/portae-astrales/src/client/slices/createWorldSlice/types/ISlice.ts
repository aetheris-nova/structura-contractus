import type { IWorldConfigWithExtendedProps } from '@aetherisnova/types';

interface ISlice {
  // state
  fetchingWorldConfig: boolean;
  worldConfig: IWorldConfigWithExtendedProps | null;
  // actions
  fetchWorldConfigAction: (payload?: undefined) => Promise<IWorldConfigWithExtendedProps>;
}

export default ISlice;
