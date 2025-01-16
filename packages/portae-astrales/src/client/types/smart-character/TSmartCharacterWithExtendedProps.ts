// types
import type ISmartCharacter from './ISmartCharacter';
import type TWithLastUpdatedAt from '../system/TWithLastUpdatedAt';

type TSmartCharacterWithExtendedProps = TWithLastUpdatedAt<ISmartCharacter>;

export default TSmartCharacterWithExtendedProps;
