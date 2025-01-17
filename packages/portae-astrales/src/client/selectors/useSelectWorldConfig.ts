// types
import type { IWorldConfigWithExtendedProps } from '@client/types';

// utils
import useStore from '@client/utils/useStore';

export default function useSelectWorldConfig(): IWorldConfigWithExtendedProps | null {
  return useStore(({ worldConfig }) => worldConfig);
}
