// types
import type { IWorldConfig, TSmartCharacterWithExtendedProps } from '@client/types';

interface IProps {
  account: TSmartCharacterWithExtendedProps;
  inGame: boolean;
  onDisconnectClick: () => void;
  worldConfig: IWorldConfig;
}

export default IProps;
