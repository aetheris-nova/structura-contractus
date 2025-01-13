// types
import type ISmartCharacter from './ISmartCharacter';
import type TWithLastUpdatedAt from './TWithLastUpdatedAt';

type TSmartCharacterWithExtendedProps = TWithLastUpdatedAt<ISmartCharacter>;

export default TSmartCharacterWithExtendedProps;
