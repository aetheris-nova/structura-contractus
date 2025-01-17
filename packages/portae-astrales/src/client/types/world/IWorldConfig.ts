import type { Address } from 'viem';

// types
import type INativeCurrency from '../evm/INativeCurrency';
import type IWorldContractConfig from './IWorldContractConfig';
import type IWorldRPCURLConfig from './IWorldRPCURLConfig';

interface IWorldConfig {
  baseDappUrl: string;
  blockExplorerUrl: string;
  chainId: number;
  contracts: IWorldContractConfig;
  indexerUrl: string;
  ipfsApiUrl: string;
  itemTypeIDs: Record<'fuel', number>;
  metadataApiUrl: string;
  name: string;
  nativeCurrency: INativeCurrency;
  rpcUrls: Record<'default' | 'public', IWorldRPCURLConfig>;
  systems: Record<string, Address>;
  vaultDappUrl: string;
  walletApiUrl: string;
}

export default IWorldConfig;
