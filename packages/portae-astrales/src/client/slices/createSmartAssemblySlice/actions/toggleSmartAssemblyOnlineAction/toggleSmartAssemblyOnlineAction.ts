import { IWorldAbi as eveWorldABI } from '@eveworld/contracts';
import { getSystemId, SYSTEM_IDS } from '@eveworld/utils';
import { type Address, encodeFunctionData, getAbiItem, ProviderRpcError, UserRejectedRequestError } from 'viem';

// errors
import BaseError from '@client/errors/BaseError';
import SmartAssemblyNotFoundError from '@client/errors/SmartAssemblyNotFoundError';
import UnknownError from '@client/errors/UnknownError';
import WorldDataNotFoundError from '@client/errors/WorldDataNotFoundError';

// types
import type { IWorldInteractionOptions, TActionCreator } from '@client/types';

// utils
import postMetaTransaction from '@client/utils/postMetaTransaction';

const toggleSmartAssemblyOnlineAction: TActionCreator<IWorldInteractionOptions, Promise<boolean>> =
  ({ getState, setState }) =>
  async ({ t, wagmiConfig }: IWorldInteractionOptions) => {
    const __function = 'toggleSmartAssemblyOnlineAction';
    const account = getState().accounts[0] || null;
    const fetchSmartAssemblyAction = getState().fetchSmartAssemblyAction;
    const logger = getState().logger;
    const smartAssembly = getState().smartAssembly;
    const worldConfig = getState().worldConfig;
    let _systemID: Address | null;
    let encodedFunctionData: Address;
    let functionName: 'bringOffline' | 'bringOnline';

    try {
      if (!worldConfig) {
        throw new WorldDataNotFoundError(`not world config found`);
      }

      if (!smartAssembly) {
        throw new SmartAssemblyNotFoundError();
      }

      _systemID =
        getSystemId(worldConfig.systems, smartAssembly.isOnline ? SYSTEM_IDS.OFFLINE : SYSTEM_IDS.ONLINE) || null;

      if (!_systemID) {
        throw new WorldDataNotFoundError(`unable to find system id "${SYSTEM_IDS.UPDATE_METADATA}"`);
      }

      setState((state) => ({
        ...state,
        loadingModalDetails: {
          loading: true,
          message: t(smartAssembly.isOnline ? 'captions.bringingUnitOffline' : 'captions.bringingUnitOnline'),
        },
      }));

      functionName = smartAssembly.isOnline ? 'bringOffline' : 'bringOnline';
      encodedFunctionData = encodeFunctionData({
        abi: [
          getAbiItem({
            abi: eveWorldABI.abi,
            name: functionName,
          }),
        ],
        args: [BigInt(smartAssembly.id)],
        functionName,
      });

      await postMetaTransaction(
        {
          fromAddress: account.address as Address,
          encodedFunctionData: encodedFunctionData,
          systemID: _systemID,
          wagmiConfig,
          worldConfig,
        },
        {
          logger,
        }
      );

      logger.debug(
        `${__function}: set assembly unit "${smartAssembly.id}" ${smartAssembly.isOnline ? 'offline' : 'online'}`
      );

      setState((state) => ({
        ...state,
        loadingModalDetails: null,
      }));

      // update the smart assembly details
      await fetchSmartAssemblyAction(smartAssembly.id);

      return true;
    } catch (error) {
      logger.error(`${__function}:`, error);

      if ((error as BaseError).isAtherisNovaError) {
        setState((state) => ({
          ...state,
          error,
          loadingModalDetails: null,
        }));
      }

      // if the user rejected the sign request
      if ((error as ProviderRpcError).code === UserRejectedRequestError.code) {
        setState((state) => ({
          ...state,
          error: null,
          loadingModalDetails: null,
        }));

        return false;
      }

      setState((state) => ({
        ...state,
        error: new UnknownError(error.message),
        loadingModalDetails: null,
      }));

      return false;
    }
  };

export default toggleSmartAssemblyOnlineAction;
