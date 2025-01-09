// types
import type { ILogger } from '@client/types';

// utils
import useStore from '@client/utils/useStore';

export default function useSelectLogger(): ILogger {
  return useStore((state) => state.logger);
}
