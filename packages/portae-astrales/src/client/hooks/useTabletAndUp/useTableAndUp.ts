// hooks
import useMediaQuery from '@client/hooks/useMediaQuery';

export default function useTableAndUp(): boolean {
  return useMediaQuery('(min-width: 768px)');
}
