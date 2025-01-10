// types
import type { IWorldConfigWithTimestamp } from '@client/types';

interface ISlice {
  // state
  worldConfig: IWorldConfigWithTimestamp | null;
  isFetchingWorldConfig: boolean;
  // actions
  fetchWorldConfigAction: (payload?: undefined) => Promise<void>;
}

export default ISlice;
