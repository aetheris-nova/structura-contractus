import { getTxUrl } from '@eveworld/utils';
import { simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core';
import type { Hash } from 'viem';

// errors
import UnknownError from '@client/errors/UnknownError';

// types
import type { IWorldInteractionOptions } from '@client/slices/createSmartAssemblySlice';
import type { TActionCreator } from '@client/types';

// utils
import extractWorldABI from '@client/utils/extractWorldABI';

const toggleSmartAssemblyOnlineAction: TActionCreator<IWorldInteractionOptions, Promise<void>> =
  ({ getState, setState }) =>
  async ({ t, wagmiConfig }: IWorldInteractionOptions) => {
    const __function = 'toggleSmartAssemblyOnlineAction';
    const fetchSmartAssemblyAction = getState().fetchSmartAssemblyAction;
    const logger = getState().logger;
    const smartAssembly = getState().smartAssembly;
    const worldConfig = getState().worldConfig;
    const worldABI = extractWorldABI(worldConfig);
    let transactionHash: Hash;

    if (!worldConfig || !worldABI || !smartAssembly) {
      return;
    }

    setState((state) => ({
      ...state,
      loadingModalDetails: {
        loading: true,
        message: t(smartAssembly.isOnline ? 'captions.bringingUnitOnline' : 'captions.bringingUnitOffline'),
      },
    }));

    try {
      const { request } = await simulateContract(wagmiConfig, {
        abi: worldABI,
        address: worldConfig.contracts.world.address,
        args: [BigInt(smartAssembly.id)],
        chainId: worldConfig.chainId,
        functionName: smartAssembly.isOnline ? 'bringOffline' : 'bringOnline',
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

      setState((state) => ({
        ...state,
        error: new UnknownError(error.message),
        loadingModalDetails: null,
      }));
    }
  };

export default toggleSmartAssemblyOnlineAction;
