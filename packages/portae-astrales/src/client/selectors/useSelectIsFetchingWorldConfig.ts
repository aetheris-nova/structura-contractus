// utils
import useStore from '@client/utils/useStore';

export default function useSelectFetchingWorldConfig(): boolean {
  return useStore((state) => state.isFetchingWorldConfig);
}
