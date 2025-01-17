// types
import type { IItemWithExtendedProps } from '@client/types';

interface ISlice {
  // state
  items: IItemWithExtendedProps[];
  fetchingItems: string[];
  // actions
  fetchItemAction: (id: string) => Promise<IItemWithExtendedProps | null>;
}

export default ISlice;
