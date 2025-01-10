// types
import type { ISlice as IProviderSlice } from '@client/slices/createProviderSlice';
import type { ISlice as ILayoutSlice } from '@client/slices/createLayoutSlice';
import type { ISlice as ISystemSlice } from '@client/slices/createSystemSlice';
import type { ISlice as IWorldSlice } from '@client/slices/createWorldSlice';

type TState = IProviderSlice & ILayoutSlice & ISystemSlice & IWorldSlice;

export default TState;
