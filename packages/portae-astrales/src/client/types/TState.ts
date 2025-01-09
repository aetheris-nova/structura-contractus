// types
import type { ISlice as ILayoutSlice } from '@client/slices/createLayoutSlice';
import type { ISlice as ISystemSlice } from '@client/slices/createSystemSlice';

type TState = ILayoutSlice & ISystemSlice;

export default TState;
