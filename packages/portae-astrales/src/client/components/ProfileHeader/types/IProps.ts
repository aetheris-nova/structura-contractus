import type { IWorldConfig, TSmartCharacterWithExtendedProps } from '@aetherisnova/types';

interface IProps {
  account: TSmartCharacterWithExtendedProps;
  inGame: boolean;
  onDisconnectClick: () => void;
  worldConfig: IWorldConfig;
}

export default IProps;
