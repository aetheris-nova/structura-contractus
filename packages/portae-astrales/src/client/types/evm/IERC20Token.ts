import type { Address } from 'viem';

interface IERC20Token {
  address: Address;
  decimals: number;
  lastUpdatedAt: number;
  name: string | null;
  symbol: string | null;
  totalSupply: string;
}

export default IERC20Token;
