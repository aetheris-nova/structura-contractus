// types
import type IWorldABIConfig from './IWorldABIConfig';
import type IWorldConfig from './IWorldConfig';

interface IWorldConfigWithExtendedProps extends IWorldConfig {
  abis: IWorldABIConfig[];
  lastUpdatedAt: number;
}

export default IWorldConfigWithExtendedProps;
