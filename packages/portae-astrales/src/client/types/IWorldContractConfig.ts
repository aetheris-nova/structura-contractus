import type { Address } from 'viem';

interface IWorldContractConfig {
  contractsVersion: string;
  eveToken: Record<'address', Address>;
  forwarder: Record<'address', Address>;
  lensSeller: Record<'address', Address>;
  world: Record<'address', Address>;
}

export default IWorldContractConfig;
