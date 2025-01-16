import type { Config } from '@wagmi/core';
import type { TFunction } from 'i18next';

interface IWorldInteractionOptions {
  t: TFunction;
  wagmiConfig: Config;
}

export default IWorldInteractionOptions;
