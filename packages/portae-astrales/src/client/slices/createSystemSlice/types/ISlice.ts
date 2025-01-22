import type { ILogger } from '@aetherisnova/types';

interface ISlice {
  // state
  inGame: boolean;
  logger: ILogger;
  // actions
  setInGame: (inGame: boolean) => void;
}

export default ISlice;
