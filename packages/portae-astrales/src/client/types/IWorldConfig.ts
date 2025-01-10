// types
import type INativeCurrency from './INativeCurrency';
import type IWorldContractConfig from './IWorldContractConfig';
import type IWorldRPCURLConfig from './IWorldRPCURLConfig';
import type IWorldSystemsConfig from './IWorldSystemsConfig';

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
  systems: IWorldSystemsConfig;
  vaultDappUrl: string;
  walletApiUrl: string;
}

export default IWorldConfig;
