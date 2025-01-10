// types
import type { IWorldConfig } from '@client/types';

// utils
import useStore from '@client/utils/useStore';

export default function useSelectWorldConfig(): IWorldConfig | null {
  return useStore((state) => state.worldConfig);
}
