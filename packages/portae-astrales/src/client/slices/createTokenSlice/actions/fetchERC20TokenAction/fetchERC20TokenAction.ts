import { readContracts } from '@wagmi/core';
import { ContractFunctionExecutionError } from 'viem';

// constants
import { FETCH_TOKEN_DETAILS_TIMEOUT } from '@client/constants';

// types
import type { IERC20Token, TActionCreator } from '@client/types';
import type { IOptions } from './types';

// utils
import upsertItemsByAddress from '@client/utils/upsertItemsByAddress';

const fetchERC20TokenAction: TActionCreator<IOptions, Promise<IERC20Token | null>> =
  ({ getState, setState }) =>
  async ({ address, config }) => {
    const __function = 'fetchERC20TokenAction';
    const fetchingTokens = getState().fetchingTokens;
    const logger = getState().logger;
    const now = new Date();
    const tokens = getState().tokens;
    const token = tokens.find((value) => value.address === address) || null;
    const worldConfig = getState().worldConfig;
    let _token: IERC20Token;

    // if we are already fetching tokens or the token was recently updated, skip
    if (
      !worldConfig ||
      !!fetchingTokens.find((value) => value === address) ||
      (token && now.getTime() > token.lastUpdatedAt + FETCH_TOKEN_DETAILS_TIMEOUT)
    ) {
      return null;
    }

    setState((state) => ({
      ...state,
      fetchingTokens: [...state.fetchingTokens, address],
    }));

    try {
      const [decimals, name, symbol, totalSupply] = await readContracts(config, {
        allowFailure: true,
        contracts: [
          {
            abi: [
              {
                inputs: [],
                name: 'decimals',
                outputs: [{ type: 'uint8' }],
                stateMutability: 'view',
                type: 'function',
              },
            ],
            address: address,
            chainId: worldConfig.chainId,
            functionName: 'decimals',
          },
          {
            abi: [
              {
                inputs: [],
                name: 'name',
                outputs: [{ type: 'string' }],
                stateMutability: 'view',
                type: 'function',
              },
            ],
            address: address,
            chainId: worldConfig.chainId,
            functionName: 'name',
          },
          {
            abi: [
              {
                inputs: [],
                name: 'symbol',
                outputs: [{ type: 'string' }],
                stateMutability: 'view',
                type: 'function',
              },
            ],
            address: address,
            chainId: worldConfig.chainId,
            functionName: 'symbol',
          },
          {
            abi: [
              {
                inputs: [],
                name: 'totalSupply',
                outputs: [{ type: 'uint256' }],
                stateMutability: 'view',
                type: 'function',
              },
            ],
            address: address,
            chainId: worldConfig.chainId,
            functionName: 'totalSupply',
          },
        ],
      });

      // throw if `name` or `symbol` failed
      if (name.error instanceof ContractFunctionExecutionError) {
        throw name.error;
      }
      if (symbol.error instanceof ContractFunctionExecutionError) {
        throw symbol.error;
      }

      // `decimals` and `totalSupply` are required
      if (decimals.error) {
        throw decimals.error;
      }
      if (totalSupply.error) {
        throw totalSupply.error;
      }

      logger.debug(`${__function}: updated erc-20 token "${address}"`);

      _token = {
        address,
        decimals: decimals.result,
        lastUpdatedAt: now.getTime(),
        name: name.result || null,
        symbol: symbol.result || null,
        totalSupply: String(totalSupply.result),
      };

      setState((state) => ({
        ...state,
        fetchingTokens: fetchingTokens.filter((value) => value !== address),
        tokens: upsertItemsByAddress<IERC20Token>(state.tokens, [_token]),
      }));

      return _token;
    } catch (error) {
      logger.error(`${__function}:`, error);

      setState((state) => ({
        ...state,
        fetchingTokens: fetchingTokens.filter((value) => value !== address),
      }));

      return null;
    }
  };

export default fetchERC20TokenAction;
