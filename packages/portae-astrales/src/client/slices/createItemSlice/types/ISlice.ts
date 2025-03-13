import type { IItemWithExtendedProps } from '@aetherisnova/types';

interface ISlice {
  // state
  items: IItemWithExtendedProps[];
  fetchingItems: string[];
  // actions
  fetchItemAction: (id: string) => Promise<IItemWithExtendedProps | null>;
}

export default ISlice;
