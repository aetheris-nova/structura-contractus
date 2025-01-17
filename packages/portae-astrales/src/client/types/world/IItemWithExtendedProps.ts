// types
import type IItem from './IItem';

interface IItemWithExtendedProps extends IItem {
  id: string;
  lastUpdatedAt: number;
}

export default IItemWithExtendedProps;
