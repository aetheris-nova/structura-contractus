// types
import type { ISmartCharacterWithTimestamp, IWorldConfig } from '@client/types';

interface IProps {
  account: ISmartCharacterWithTimestamp;
  inGame: boolean;
  onDisconnectClick: () => void;
  worldConfig: IWorldConfig;
}

export default IProps;
