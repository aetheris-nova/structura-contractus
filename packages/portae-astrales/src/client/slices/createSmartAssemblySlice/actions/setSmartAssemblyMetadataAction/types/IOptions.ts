// types
import type { IWorldInteractionOptions } from '@client/types';

interface IOptions extends IWorldInteractionOptions {
  dappURL: string;
  description: string;
  name: string;
}

export default IOptions;
