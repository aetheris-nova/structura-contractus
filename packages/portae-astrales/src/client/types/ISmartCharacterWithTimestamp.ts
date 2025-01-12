// types
import type ISmartCharacter from './ISmartCharacter';

interface ISmartCharacterWithTimestamp extends ISmartCharacter {
  lastUpdatedAt: number;
}

export default ISmartCharacterWithTimestamp;
