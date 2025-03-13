import type { IWorldConfigWithExtendedProps } from '@aetherisnova/types';
import type { Config } from '@wagmi/core';
import type { Address } from 'viem';

interface IOptions {
  encodedFunctionData: Address;
  fromAddress: Address;
  systemID: Address;
  wagmiConfig: Config;
  worldConfig: IWorldConfigWithExtendedProps;
}

export default IOptions;
