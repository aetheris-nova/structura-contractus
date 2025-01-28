import type { ILogger } from '@aetherisnova/types';

interface ISlice {
  // state
  inGame: boolean;
  logger: ILogger;
  // actions
  setInGameAction: (inGame: boolean) => void;
}

export default ISlice;
