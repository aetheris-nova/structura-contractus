// types
import type { IItemWithExtendedProps } from '@client/types';

// utils
import useStore from '@client/utils/useStore';

export default function useSelectFuelItem(): IItemWithExtendedProps | null {
  return useStore((state) => {
    const fuelItemID = state.worldConfig?.itemTypeIDs.fuel || null;

    if (!fuelItemID) {
      return null;
    }

    return state.items.find(({ id }) => id === fuelItemID.toString()) || null;
  });
}
