// constants
import { FETCH_ACCOUNT_DELAY, FETCH_ACCOUNT_TIMEOUT } from '@client/constants';

// types
import type { ISmartCharacter, TActionCreator, TSmartCharacterWithExtendedProps } from '@client/types';

// utils
import fetchSmartCharacterByAddress from '@client/utils/fetchSmartCharacterByAddress';

const setAccountsAction: TActionCreator<string[], Promise<TSmartCharacterWithExtendedProps[]>> =
  ({ getState, setState }) =>
  async (addresses) => {
    const __function = 'setAccountsAction';
    const accounts = getState().accounts;
    const logger = getState().logger;
    const now = new Date();
    let _accounts: TSmartCharacterWithExtendedProps[] = [];
    let account: TSmartCharacterWithExtendedProps | null;
    let address: string;
    let result: ISmartCharacter;

    setState((state) => ({
      ...state,
      fetchingAccounts: accounts.map(({ address }) => address),
    }));

    for (let i = 0; i < addresses.length; i++) {
      address = addresses[i].toLowerCase();
      account = accounts.find((value) => value.address === address) || null;

      // if the account exists and has been updated recently, don't bother fetching
      if (account && now.getTime() > account.lastUpdatedAt + FETCH_ACCOUNT_TIMEOUT) {
        _accounts.push(account);

        continue;
      }

      try {
        result = await fetchSmartCharacterByAddress(address, { delay: FETCH_ACCOUNT_DELAY * i });
      } catch (error) {
        logger.error(`${__function}:`, error);

        continue;
      }

      _accounts.push({
        ...result,
        lastUpdatedAt: now.getTime(),
      });
    }

    logger.debug(`${__function}: updated accounts [${_accounts.map(({ address }) => `"${address}"`).join(', ')}]`);

    setState((state) => ({
      ...state,
      accounts: _accounts,
      fetchingAccounts: [],
      selectedAccountAddress: _accounts.find(({ address }) => address === state.selectedAccountAddress)
        ? state.selectedAccountAddress
        : _accounts[0]?.address || null,
    }));

    return _accounts;
  };

export default setAccountsAction;
