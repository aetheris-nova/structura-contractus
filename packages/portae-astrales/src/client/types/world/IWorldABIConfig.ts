import type { Abi } from 'viem';

interface IWorldABIConfig {
  abi: Abi;
  deployed_to: string;
  name: string;
  chain_id: number;
  urls: Record<'private' | 'public', string[]>;
}

export default IWorldABIConfig;
