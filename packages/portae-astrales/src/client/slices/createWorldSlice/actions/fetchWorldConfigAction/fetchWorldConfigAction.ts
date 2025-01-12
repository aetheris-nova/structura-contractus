import axios, { type AxiosResponse } from 'axios';

// constants
import { FETCH_WORLD_CONFIG_TIMEOUT } from '@client/constants';

// types
import type { IWorldConfig, IWorldConfigWithTimestamp, TActionCreator } from '@client/types';

/**
 * Fetches the World config (based on the env var VITE_WORLD_API_URL). As the world config persists to storage, if the
 * existing config is out of date, a new config is fetched.
 */
const fetchWorldConfigAction: TActionCreator<undefined, Promise<IWorldConfigWithTimestamp>> =
  ({ getState, setState }) =>
  async () => {
    const __functionName = 'fetchWorldConfigAction';
    const logger = getState().logger;
    const worldConfig = getState().worldConfig;
    let _worldConfig: IWorldConfigWithTimestamp;
    let now: Date = new Date();
    let response: AxiosResponse<IWorldConfig[]>;
    let result: IWorldConfig | null;

    // if the world config has already been updated recently, we don't need to update
    if (worldConfig && now.getTime() > worldConfig.lastUpdatedAt + FETCH_WORLD_CONFIG_TIMEOUT) {
      return worldConfig;
    }

    setState((state) => ({
      ...state,
      isFetchingWorldConfig: true,
    }));

    try {
      response = await axios.get(`${import.meta.env.VITE_WORLD_API_URL}/config`);
      result = response.data[0] || null;

      if (!result) {
        throw new Error('failed to fetch a world config');
      }

      logger.debug(`${__functionName}: fetched world config for chain ID "${result.chainId}"`);

      _worldConfig = {
        ...result,
        lastUpdatedAt: now.getTime(),
      };

      setState((state) => ({
        ...state,
        isFetchingWorldConfig: false,
        worldConfig: _worldConfig,
      }));

      return _worldConfig;
    } catch (error) {
      logger.error(`${__functionName}:`, error);

      setState((state) => ({
        ...state,
        isFetchingWorldConfig: false,
      }));

      throw error;
    }
  };

export default fetchWorldConfigAction;
