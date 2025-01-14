// types
import type IWorldConfig from './IWorldConfig';

interface IWorldConfigWithExtendedProps extends IWorldConfig {
  lastUpdatedAt: number;
}

export default IWorldConfigWithExtendedProps;
