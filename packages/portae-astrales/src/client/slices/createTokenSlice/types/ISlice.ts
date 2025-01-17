// types
import type { IERC20Token } from '@client/types';
import type { IOptions as IFetchERC20TokenActionOptions } from '../actions/fetchERC20TokenAction';

interface ISlice {
  // state
  tokens: IERC20Token[];
  fetchingTokens: string[];
  // actions
  fetchERC20TokenAction: (options: IFetchERC20TokenActionOptions) => Promise<IERC20Token | null>;
}

export default ISlice;
