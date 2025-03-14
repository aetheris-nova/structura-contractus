// types
import type { ISlice as IAccountSlice } from '@client/slices/createAccountSlice';
import type { ISlice as IItemSlice } from '@client/slices/createItemSlice';
import type { ISlice as ILayoutSlice } from '@client/slices/createLayoutSlice';
import type { ISlice as ISmartAssemblySlice } from '@client/slices/createSmartAssemblySlice';
import type { ISlice as ISystemSlice } from '@client/slices/createSystemSlice';
import type { ISlice as IWorldSlice } from '@client/slices/createWorldSlice';

type TState = IAccountSlice & IItemSlice & ILayoutSlice & ISmartAssemblySlice & ISystemSlice & IWorldSlice;

export default TState;
