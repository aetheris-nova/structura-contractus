import type { Address } from 'viem';

// types
import type { IWorldABI } from '@client/types';

interface IWorldABIConfigResponse {
  base_dapp_url: string;
  cfg: IWorldABI[];
  vault_dapp_url: string;
  system_ids: Record<string, Address>;
}

export default IWorldABIConfigResponse;
