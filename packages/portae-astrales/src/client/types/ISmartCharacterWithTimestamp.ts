import type { SmartCharacter } from '@eveworld/types';

interface ISmartCharacterWithTimestamp extends SmartCharacter {
  lastUpdatedAt: number;
}

export default ISmartCharacterWithTimestamp;
