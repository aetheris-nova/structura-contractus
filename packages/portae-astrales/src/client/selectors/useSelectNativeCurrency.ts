// types
import type { INativeCurrency } from '@client/types';

// utils
import useStore from '@client/utils/useStore';

export default function useSelectNativeCurrency(): INativeCurrency | null {
  return useStore(({ worldConfig }) => worldConfig?.nativeCurrency || null);
}
