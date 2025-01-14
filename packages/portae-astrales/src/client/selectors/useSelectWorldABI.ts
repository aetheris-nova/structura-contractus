import type { Abi } from 'viem';

// utils
import extractWorldABI from '@client/utils/extractWorldABI';
import useStore from '@client/utils/useStore';

export default function useSelectWorldABI(): Abi | null {
  return useStore(({ worldConfig }) => extractWorldABI(worldConfig));
}
