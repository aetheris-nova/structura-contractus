// constants
import { FETCH_ACCOUNT_TIMEOUT, POLL_ACCOUNT_INTERVAL } from '@client/constants';

// types
import type { ISmartCharacter, TActionCreator, TSmartCharacterWithExtendedProps } from '@client/types';

// utils
import fetchSmartCharacterByAddress from '@client/utils/fetchSmartCharacterByAddress';
import upsertItemsByAddress from '@client/utils/upsertItemsByAddress';

const startPollingForSmartCharacterAction: TActionCreator<undefined, void> =
  ({ getState, setState }) =>
  () => {
    const __function = 'startPollingForSmartCharacterAction';
    const interval = window.setInterval(async () => {
      const accounts = getState().accounts;
      const fetchingAccounts = getState().fetchingAccounts;
      const logger = getState().logger;
      const now = new Date();
      const selectedAccountAddress = getState().selectedAccountAddress;
      const fetching = selectedAccountAddress
        ? !!fetchingAccounts.find((value) => value === selectedAccountAddress)
        : false;
      const selectedAccount = selectedAccountAddress
        ? accounts.find(({ address }) => address === selectedAccountAddress) || null
        : null;
      let result: ISmartCharacter;

      // skip if there is no account, the account is being fetched or it was updated recently
      if (fetching || !selectedAccount || now.getTime() < selectedAccount.lastUpdatedAt + FETCH_ACCOUNT_TIMEOUT) {
        return;
      }

      setState((state) => ({
        ...state,
        fetchingAccounts: [...state.fetchingAccounts, selectedAccount.address],
      }));

      try {
        result = await fetchSmartCharacterByAddress(selectedAccount.address);
      } catch (error) {
        logger.error(`${__function}:`, error);

        setState((state) => ({
          ...state,
          fetchingAccounts: state.fetchingAccounts.filter((value) => value !== selectedAccount.address),
        }));

        return;
      }

      setState((state) => ({
        ...state,
        accounts: upsertItemsByAddress<TSmartCharacterWithExtendedProps>(accounts, [
          {
            ...result,
            lastUpdatedAt: now.getTime(),
          },
        ]),
        fetchingAccounts: state.fetchingAccounts.filter((value) => value !== selectedAccount.address),
      }));
    }, POLL_ACCOUNT_INTERVAL);

    setState((state) => ({
      ...state,
      smartCharacterPollingInterval: interval,
    }));
  };

export default startPollingForSmartCharacterAction;
