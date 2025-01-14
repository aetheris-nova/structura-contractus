// types
import type IWorldABI from './IWorldABI';
import type IWorldConfig from './IWorldConfig';

interface IWorldConfigWithExtendedProps extends IWorldConfig {
  abis: IWorldABI[];
  lastUpdatedAt: number;
}

export default IWorldConfigWithExtendedProps;
