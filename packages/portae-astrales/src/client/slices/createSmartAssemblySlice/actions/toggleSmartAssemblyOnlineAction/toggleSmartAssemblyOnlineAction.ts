import { getTxUrl } from '@eveworld/utils';
import { simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core';
import { getAbiItem, type Hash } from 'viem';

// contracts
import worldABI from '@dist/contracts/world/IWorld.sol/IWorld.abi.json';

// errors
import BaseError from '@client/errors/BaseError';
import SmartAssemblyNotFoundError from '@client/errors/SmartAssemblyNotFoundError';
import UnknownError from '@client/errors/UnknownError';
import WorldDataNotFoundError from '@client/errors/WorldDataNotFoundError';

// types
import type { IWorldInteractionOptions, TActionCreator } from '@client/types';

const toggleSmartAssemblyOnlineAction: TActionCreator<IWorldInteractionOptions, Promise<void>> =
  ({ getState, setState }) =>
  async ({ t, wagmiConfig }: IWorldInteractionOptions) => {
    const __function = 'toggleSmartAssemblyOnlineAction';
    const fetchSmartAssemblyAction = getState().fetchSmartAssemblyAction;
    const logger = getState().logger;
    const smartAssembly = getState().smartAssembly;
    const worldConfig = getState().worldConfig;
    let functionName: 'eveworld__bringOffline' | 'eveworld__bringOnline';
    let transactionHash: Hash;

    if (!worldConfig || !smartAssembly) {
      return;
    }

    try {
      if (!worldConfig) {
        throw new WorldDataNotFoundError(`not world config found`);
      }

      if (!smartAssembly) {
        throw new SmartAssemblyNotFoundError();
      }

      setState((state) => ({
        ...state,
        loadingModalDetails: {
          loading: true,
          message: t(smartAssembly.isOnline ? 'captions.bringingUnitOnline' : 'captions.bringingUnitOffline'),
        },
      }));

      functionName = smartAssembly.isOnline ? 'eveworld__bringOffline' : 'eveworld__bringOnline';
      const { request } = await simulateContract(wagmiConfig, {
        abi: [
          getAbiItem({
            abi: worldABI,
            name: functionName,
          }),
        ],
        address: worldConfig.contracts.world.address,
        args: [BigInt(smartAssembly.id)],
        chainId: worldConfig.chainId,
        functionName,
      });

      transactionHash = await writeContract(wagmiConfig, request);

      await waitForTransactionReceipt(wagmiConfig, {
        hash: transactionHash,
      });

      logger.debug(
        `${__function}: set assembly unit "${smartAssembly.id}" ${smartAssembly.isOnline ? 'offline' : 'online'} in transaction "${getTxUrl(worldConfig.blockExplorerUrl, transactionHash)}"`
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

export default toggleSmartAssemblyOnlineAction;
