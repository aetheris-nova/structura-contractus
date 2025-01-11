// types
import type { ISmartCharacterWithTimestamp } from '@client/types';

interface IProps {
  account: ISmartCharacterWithTimestamp;
  onDisconnectClick: () => void;
}

export default IProps;
