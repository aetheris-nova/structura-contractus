// types
import type { ISlice as IAccountSlice } from '@client/slices/createAccountSlice';
import type { ISlice as IItemSlice } from '@client/slices/createItemSlice';
import type { ISlice as ILayoutSlice } from '@client/slices/createLayoutSlice';
import type { ISlice as ISystemSlice } from '@client/slices/createSystemSlice';
import type { ISlice as ITokenSlice } from '@client/slices/createTokenSlice';
import type { ISlice as IWorldSlice } from '@client/slices/createWorldSlice';

type TState = IAccountSlice & IItemSlice & ILayoutSlice & ISystemSlice & ITokenSlice & IWorldSlice;

export default TState;
