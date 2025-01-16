import { getSystemId, SYSTEM_IDS } from '@eveworld/utils';
import { type Address, encodeFunctionData, getAbiItem } from 'viem';

// contracts
import worldABI from '@dist/contracts/world/IWorld.sol/IWorld.abi.json';

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

const setSmartAssemblyMetadataAction: TActionCreator<IOptions, Promise<void>> =
  ({ getState, setState }) =>
  async ({ dappURL, description, name, t, wagmiConfig }: IOptions) => {
    const __function = 'setSmartAssemblyMetadataAction';
    const account = getState().accounts[0] || null;
    const fetchSmartAssemblyAction = getState().fetchSmartAssemblyAction;
    const setDeployableMetadataFunctionName = 'eveworld__setDeployableMetadata';
    const logger = getState().logger;
    const smartAssembly = getState().smartAssembly;
    const worldConfig = getState().worldConfig;
    let _systemID: Address | null;
    let encodedSetDeployableMetadataFunctionData: Address;

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

      encodedSetDeployableMetadataFunctionData = encodeFunctionData({
        abi: [
          getAbiItem({
            abi: worldABI,
            name: setDeployableMetadataFunctionName,
          }),
        ],
        args: [BigInt(smartAssembly.id), name, description, dappURL],
        functionName: setDeployableMetadataFunctionName,
      });

      await postMetaTransaction(
        {
          fromAddress: account.address as Address,
          encodedFunctionData: encodedSetDeployableMetadataFunctionData,
          systemID: _systemID,
          wagmiConfig,
          worldConfig,
        },
        {
          logger,
        }
      );

      setState((state) => ({
        ...state,
        loadingModalDetails: null,
      }));

      // update the smart assembly details
      await fetchSmartAssemblyAction(smartAssembly.id);
    } catch (error) {
      logger.error(`${__function}:`, error);

      if ((error as BaseError).isAtherisNovaError) {
        setState((state) => ({
          ...state,
          error,
          loadingModalDetails: null,
        }));
      }

      setState((state) => ({
        ...state,
        error: new UnknownError(error.message),
        loadingModalDetails: null,
      }));
    }
  };

export default setSmartAssemblyMetadataAction;
