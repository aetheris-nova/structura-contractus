import type { Address } from 'viem';
import type { Config } from '@wagmi/core';

interface IOptions {
  address: Address;
  config: Config;
}

export default IOptions;
