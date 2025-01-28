import { IWorldAbi as eveWorldABI } from '@eveworld/contracts';
import { getSystemId, SYSTEM_IDS } from '@eveworld/utils';
import { type Address, encodeFunctionData, getAbiItem, ProviderRpcError, UserRejectedRequestError } from 'viem';

// errors
import BaseError from '@client/errors/BaseError';
import NoAccountConnectedError from '@client/errors/NoAccountConnectedError';
import SmartAssemblyNotFoundError from '@client/errors/SmartAssemblyNotFoundError';
import UnknownError from '@client/errors/UnknownError';
import WorldDataNotFoundError from '@client/errors/WorldDataNotFoundError';

// types
import type { TActionCreator } from '@client/types';
import type { IOptions } from './types';

// utils
import postMetaTransaction from '@client/utils/postMetaTransaction';

const setSmartAssemblyMetadataAction: TActionCreator<IOptions, Promise<boolean>> =
  ({ getState, setState }) =>
  async ({ dappURL, description, name, t, wagmiConfig }: IOptions) => {
    const __function = 'setSmartAssemblyMetadataAction';
    const account = getState().accounts[0] || null;
    const fetchSmartAssemblyAction = getState().fetchSmartAssemblyAction;
    const functionName = 'setDeployableMetadata';
    const logger = getState().logger;
    const smartAssembly = getState().smartAssembly;
    const worldConfig = getState().worldConfig;
    let _systemID: Address | null;
    let encodedFunctionData: Address;

    try {
      if (!worldConfig) {
        throw new WorldDataNotFoundError(`not world config found`);
      }

      if (!smartAssembly) {
        throw new SmartAssemblyNotFoundError();
      }

      if (!account) {
        throw new NoAccountConnectedError();
      }

      _systemID = getSystemId(worldConfig.systems, SYSTEM_IDS.UPDATE_METADATA) || null;

      if (!_systemID) {
        throw new WorldDataNotFoundError(`unable to find system id "${SYSTEM_IDS.UPDATE_METADATA}"`);
      }

      setState((state) => ({
        ...state,
        loadingModalDetails: {
          loading: true,
          message: t('captions.updatingDetails'),
        },
      }));

      encodedFunctionData = encodeFunctionData({
        abi: [
          getAbiItem({
            abi: eveWorldABI.abi,
            name: functionName,
          }),
        ],
        args: [BigInt(smartAssembly.id), name, description, dappURL],
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

      logger.debug(`${__function}: updated metadata for smart assembly "${smartAssembly.id}"`);

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

export default setSmartAssemblyMetadataAction;
