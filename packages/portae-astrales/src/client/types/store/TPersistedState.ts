// types
import type TState from './TState';

type TPersistedState = Pick<TState, 'accounts' | 'colorMode' | 'items' | 'worldConfig'>;

export default TPersistedState;
