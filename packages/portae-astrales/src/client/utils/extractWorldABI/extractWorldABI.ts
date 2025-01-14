import type { Abi } from 'viem';

// types
import type { IWorldConfigWithExtendedProps } from '@client/types';

export default function extractWorldABI(worldConfig: IWorldConfigWithExtendedProps | null): Abi | null {
  return worldConfig?.abis.find(({ name }) => name === 'IWorld')?.abi || null;
}
