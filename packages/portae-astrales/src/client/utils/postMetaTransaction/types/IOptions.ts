import type { Config } from '@wagmi/core';
import type { Address } from 'viem';

// types
import type { IWorldConfigWithExtendedProps } from '@client/types';

interface IOptions {
  encodedFunctionData: Address;
  fromAddress: Address;
  systemID: Address;
  wagmiConfig: Config;
  worldConfig: IWorldConfigWithExtendedProps;
}

export default IOptions;
