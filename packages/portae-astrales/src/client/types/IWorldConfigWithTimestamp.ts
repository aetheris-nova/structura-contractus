// types
import type IWorldConfig from './IWorldConfig';

interface IWorldConfigWithTimestamp extends IWorldConfig {
  lastUpdatedAt: number;
}

export default IWorldConfigWithTimestamp;
