import type { Abi, Address } from 'viem';

// types
import type IEIP712 from './IEIP712';

interface IWorldABI {
  abi: Abi;
  chain_id: number;
  eip712: IEIP712 | null;
  deployed_to: Address;
  name: string;
  urls: Record<'private' | 'public', string[]>;
}

export default IWorldABI;
